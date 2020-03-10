const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()
const Utils = require('./../utils/utils')
const PermissionQuery = require('./permission')

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const photosFromQuery = async (Query, params) => {
  try {
    const query = await Query(params)
    if (query.rowCount > 0) {
      return query.rows
    } else return []
  } catch (error) { console.log(error) }
  return null
}

const getPublic = async () => {
  let hasErrors = false
  const getPublicQuery = () => {
    return getQuery(`
      select
        photos.id,
        filetype,
        equirectangular,
        array[timestamp_to_epoch(timerange[1]),timestamp_to_epoch(timerange[2])] as daterange,
        case when friend = -1 then location else null end as location
      from photos 

      left join locations on (photos.location = locations.id)
      left join permissions on (locations.permission = permissions.id)
      where ( select count(*) from unnest(photos.permissions) as n ) = (
        select count(n) from unnest(photos.permissions) as n
        where n in (
          select id from permissions where friend = -1
        )
      )
    `)
  }
  return await photosFromQuery(getPublicQuery, null)
}

const getOwnedByUser = async (username) => {
  const getOwnedQuery = (params) => {
    return getQuery(`
      select
        id,
        filetype,
        equirectangular,
        array[timestamp_to_epoch(timerange[1]),timestamp_to_epoch(timerange[2])] as daterange,
        location 
      from photos as photo
      
      where photo.owner = (
        select id from users where username='${params.username}'
      )
    `)
  }
  return await photosFromQuery(getOwnedQuery, { username })
}

const getSingle = async (username, id) => {
  const getBasicInfoQuery = (params) => {
    return getQuery(`
      select * from photos as photo
      where photo.id = '${params.id}'
    `)
  }
  const getFullInfoQuery = (params) => {
    return getQuery(`
      select
          photos.id,
          photos.name,
          photos.description,
          array[timestamp_to_epoch(timerange[1]),timestamp_to_epoch(timerange[2])] as daterange,
          row_to_json(locations.*) as location,
          owner.username as owner,
          uploader.username as uploader,
          labeluuids_to_labels(labels) as labels,
          commentuuids_to_comments(photos.comments) as comments,
          equirectangular,
          panorama,
          filetype
        from photos
        left join locations on(photos.location = locations.id)
        left join users owner on(photos.owner = owner.id)
        left join users uploader on(photos.uploader = uploader.id)
      where photos.id = '${params.id}'
 `)
  }

  if (username) {
    let photoInfo = await photosFromQuery(getFullInfoQuery, { username, id })
    if (photoInfo) {
      return photoInfo
    }
  }
  return await photosFromQuery(getFullInfoQuery, { id })
}

const createLocation = async(username, id, location) => {
  const permissions = await PermissionQuery.createNew( username, ( location.privacy ? location.privacy : "private" ), true )

  const insertWithCity = async() => {
    const getCity = (city, country) => {
      const countryQuery = country === undefined || country === '' ? `null` : `'${country}'`
      return getQuery(`
        select citycountry_to_uuid('${city}', ${countryQuery}) as id
      `)
    }
    const createCity = (city, country) => {
      return getQuery(`
        insert into cities( id, name, country )
        values( uuid_generate_v4(), '${city}', ${Utils.apostrophize(country)} )
        returning id
      `)
    }

    let cityId = await getCity(location.city, location.country)
    console.log( cityId.rows[0].id )
    if( cityId.rows[0].id === null  ){
      cityId = await createCity(location.city, location.country)
      if( cityId.rowCount > 0  ){
        cityId = cityId.rows[0].id
      }else{
        cityId = false
      }
    }else if( cityId.rows[0].id !== undefined ){
      cityId = cityId.rows[0].id
    }else{
      cityId = false
    }
    if( cityId ){
      return getQuery(`
      insert into locations( id, name, owner, latitude, longitude, address, postalcode, permission, city )
      values( uuid_generate_v4(), '${location.name}', username_to_uuid('${username}'), ${Utils.apostrophize(location.latitude)}, ${Utils.apostrophize(location.longitude)}, ${Utils.apostrophize(location.address)}, ${Utils.apostrophize(location.postalcode)}, ${Utils.apostrophize(permissions)}, '${cityId}' )
      returning id,name
    `)
    }
    return false
  }

  const insertWithoutCity = () => {
    return getQuery(`
      insert into locations( id, name, owner, latitude, longitude, address, postalcode, permission )
      values( uuid_generate_v4(), '${location.name}', username_to_uuid('${username}'), ${Utils.apostrophize(location.latitude)}, ${Utils.apostrophize(location.longitude)}, ${Utils.apostrophize(location.address)}, ${Utils.apostrophize(location.postalcode)}, ${Utils.apostrophize(permissions)} )
      returning id,name
    `)
  }

  let response = false
  let newLocation = false
  if( location.city === '' ){
    response = await insertWithoutCity()
  }else{
    response = await insertWithCity()
  }
  
  if( response && response.rowCount > 0 ){
    newLocation = response.rows[0]
  }


  if( newLocation ){
    response = await changeLocation(username, id, newLocation.id )
  }

  return newLocation
}

const changeLocation = async(username, id, location) => {
  const addLocationQuery = (params) => {
    return getQuery(`
      update photos
      set location = '${params.location}'
      where id = '${params.id}'
      and(
        username_to_uuid('${params.username}') = owner
        or username_to_uuid('${params.username}') = uploader
        or username_to_uuid('${params.username}') = any (people) 
      )
      returning id
    `)
  }
  const removeLocationQuery = (params) => {
    return getQuery(`
      update photos
      set location = null
      where id = '${params.id}'
      and(
        username_to_uuid('${params.username}') = owner
        or username_to_uuid('${params.username}') = uploader
        or username_to_uuid('${params.username}') = any (people) 
      )
      returning id
    `)
  }

  let result
  if( location !== null ){
    result = await addLocationQuery({username, id, location})
  }else{
    result = await removeLocationQuery({username, id, location})
  }
  if( result.rowCount > 0 ){
    return true
  }
  return false
}


const search = async (username,labels,locations) => {
  const searchQuery = (params) => {
    return getQuery(`
      select
        id,
        filetype,
        equirectangular,
        array[timestamp_to_epoch(timerange[1]),timestamp_to_epoch(timerange[2])] as daterange,
        location 
      from photos as p
      where (${labelConditions}) and (${locationConditions})
    `)
  }
  const buildConditions = (terms, table) => {
    if( terms && terms.length > 0 ){
      const size = terms.length
      let result = ''
      for( let i=0; i<size; i++ ){
        result+=`'${terms[i].id}' = ${table} or `
      }
      return result.slice(0,-4)
    }else return 'true'
  }
  const labelConditions = buildConditions(labels,'any(p.labels)')
  const locationConditions = buildConditions(locations,'p.location')

  return await photosFromQuery(searchQuery, labelConditions, locationConditions)
}

module.exports = {
  getPublic,
  getOwnedByUser,
  getSingle,
  search,
  changeLocation,
  createLocation
}