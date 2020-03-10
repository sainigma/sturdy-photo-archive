const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()

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
          commentuuids_to_comments(photos.comments) as comments
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
  changeLocation
}