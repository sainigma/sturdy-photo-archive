const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const photosFromQuery = async(Query,params) =>{
  try{
    const query = await Query(params)
    if( query.rowCount>0 ){
      return query.rows
    }else return []
  }catch(error){console.log(error)}
  return null
}

const getPublic = async() => {
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
  return await photosFromQuery(getPublicQuery,null)
}

const getOwnedByUser = async(username) => {
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
  return await photosFromQuery(getOwnedQuery,{username})
}

const getFullInfo = async(username,id) => {
  const getFullInfoQuery = (params) => {
    return getQuery(`
      select * from photos as photo
      where photo.id = '${params.id}'
    `)
  }
}

module.exports = {
  getPublic,
  getOwnedByUser
}