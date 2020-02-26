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
          array[date_part('epoch', timerange[1]),date_part('epoch', timerange[2])] as daterange,
          row_to_json(locations.*) as location,
          owner.username as owner,
          uploader.username as uploader
        from photos
        left join locations on(photos.location = locations.id)
        left join users owner on(photos.owner = owner.id)
        left join users uploader on(photos.uploader = uploader.id)
      where photos.id = '${params.id}'
 `)
  }
  const fetchComments = (params) => {
    return getQuery(`
      select 
      json_agg(row_to_json(comments)) as comments
      from comments
      where comments.id in
      (select
        unnest(comments)
        from photos
        where photos.id = '${params.id}'
      )
    `)
  }


  if (username) {
    let photoInfo = await photosFromQuery(getFullInfoQuery, { username, id })
    if (photoInfo) {
      const comments = await photosFromQuery(fetchComments, {id})
      if( comments ){
        photoInfo[0].comments = await JSON.parse(JSON.stringify(comments[0].comments))
        return photoInfo
      }
    }
  }
  return await photosFromQuery(getFullInfoQuery, { id })
}

module.exports = {
  getPublic,
  getOwnedByUser,
  getSingle
}