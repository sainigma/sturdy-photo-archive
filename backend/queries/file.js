const { Client } = require('pg')
const User = require('./user')
const LocationQuery = require('./location')
const PermissionQuery = require('./permission')
const Utils = require('./../utils/utils')
const Security = require('./../utils/security')
const config = require('./../utils/config')

const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const uniqueForUser = async( username, checkSum ) => {

  const uniqueForUserQuery = (username, checkSum) => {
    return getQuery(`
      select md5 from photos
      where owner in ( select id from users where username=${Utils.apostrophize(username)})
      and md5 = ${Utils.apostrophize(checkSum)}
    `)
  }

  const result = await uniqueForUserQuery(username, checkSum)
  console.log(result)
  if( result.rowCount > 0 ) return false
  else return true
}

const createFile = async(username,labelsString, checkSum, filetype) => {
  const user = await User.findOne( {username} )
  let labels = Security.sanitizeJSON( labelsString )

  const newFileQuery = (name, owner, location, permission, daterange, special ) => {
    return getQuery(`
      INSERT INTO photos (id, name, owner, uploader, location, locheight, localtitude, locazimuth, locoffsetx, locoffsety, priority, panorama, equirectangular, permissions, timerange, md5, filetype )
      VALUES( uuid_generate_v4(), ${Utils.apostrophize(name)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(location)}, ${Utils.apostrophize(special.height)}, ${Utils.apostrophize(special.altitude)}, ${Utils.apostrophize(special.azimuth)}, ${Utils.apostrophize(special.xoffset)}, ${Utils.apostrophize(special.yoffset)}, 1, ${special.panorama}, ${special.equirectangular}, ARRAY[${Utils.apostrophize(permission)}::uuid], ARRAY[to_timestamp(${parseInt(daterange.start)}),to_timestamp(${parseInt(daterange.end)})], ${Utils.apostrophize(checkSum)}, ${Utils.apostrophize(filetype)} )
      RETURNING id,filetype,location,equirectangular,array[timestamp_to_epoch(timerange[1]),timestamp_to_epoch(timerange[2])] as daterange
    `)
  }

  const fetchDateFromImage = async() => {
    console.log(labels)
    if( labels.daterange.auto === false ){
      const startTime = labels.daterange.start.split('/')
      const endTime = labels.daterange.end !== null ? labels.daterange.end.split('/') : startTime
      const startDate = await Date.UTC( startTime[2], startTime[1]-1, startTime[0] )/1000
      const endDate = await Date.UTC( endTime[2], endTime[1]-1, endTime[0] )/1000
      return {
        start: startDate,
        end: endDate
      }
    }else{
      if( labels.lastModified !== null ){
        return{
          start: labels.lastModified/1000,
          end: labels.lastModified/1000
        }
      }
      else return {
        start: 0,
        end: Date.now()/1000,
      }
    }
  }

  const saveEntry = async(name, userid, locationid, permissionid) => {
    let daterange = await fetchDateFromImage()
    try{
      const result = await newFileQuery(name, userid, locationid, permissionid, daterange, labels.special)
      if( result.rows.length > 0 ){
        console.log(result.rows[0])
        return result.rows[0]
      }
    }catch(error){console.log(error)}
    return null
  }

  const createWithNewLocation = async() => {
    const newLocationId = await LocationQuery.createNew( user.id, labels.location )
    const newPermissionId = newLocationId ? await PermissionQuery.createNew( user.id, labels.privacy, false ) : null
    if( newLocationId && newPermissionId ){
      return await saveEntry( labels.name, user.id, newLocationId, newPermissionId )
    }
    return null
  }

  const createWithOldLocation = async() => {
    const locationIdExists = await LocationQuery.findOne({id:labels.location.id})
    const newPermissionId = locationIdExists ? await PermissionQuery.createNew( user.id, labels.privacy, false ) : null
    if( locationIdExists && newPermissionId ){
      return await saveEntry( labels.name, user.id, labels.location.id, newPermissionId )
    }
  }

  const createWithoutLocation = async() => {
    const newPermissionId = await PermissionQuery.createNew( user.id, labels.privacy, false )
    if( newPermissionId ){
      return await saveEntry( labels.name, user.id, null, newPermissionId )
    }
  }

  if( Utils.varExists(labels) ){
    if( Utils.varExists(labels.location.id) ){
      return await createWithOldLocation()
    }else if( Utils.varExists(labels.location.name) && labels.location.name !== '' ){
      return await createWithNewLocation()
    }else{
      return await createWithoutLocation()
    }
  }
  return null
}

module.exports = {
  createFile,
  uniqueForUser
}