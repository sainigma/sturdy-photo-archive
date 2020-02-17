const { Client } = require('pg')
const User = require('./user')
const LocationQuery = require('./location')
const PermissionQuery = require('./permission')
const Utils = require('./../utils/utils')
const config = require('./../utils/config')

const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const createFile = async(username,labelsString) => {
  const user = await User.findOne( {username} )
  let labels = JSON.parse( labelsString )
  //console.log( labels )

  const newFileQuery = (name, owner, location, permission, daterange, special) => {
    return getQuery(`
      INSERT INTO photos (id, name, owner, uploader, location, locheight, localtitude, locazimuth, locoffsetx, locoffsety, priority, panorama, equirectangular, permissions, timerange )
      VALUES( uuid_generate_v4(), ${Utils.apostrophize(name)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(location)}, ${Utils.apostrophize(special.height)}, ${Utils.apostrophize(special.altitude)}, ${Utils.apostrophize(special.azimuth)}, ${Utils.apostrophize(special.xoffset)}, ${Utils.apostrophize(special.yoffset)}, 1, ${special.panorama}, ${special.equirectangular}, ARRAY[${Utils.apostrophize(permission)}::uuid], ARRAY[to_timestamp(${parseInt(daterange.start)}),to_timestamp(${parseInt(daterange.end)})] )
      RETURNING id
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
      //hae metadatasta
      return {
        start: 1581953168,
        end: 1581953168,
      }
    }
  }

  const saveEntry = async(name, userid, locationid, permissionid) => {
    let daterange = await fetchDateFromImage()
    try{
      const result = await newFileQuery(name, userid, locationid, permissionid, daterange, labels.special)
      if( result.rows.length > 0 ){
        return result.rows[0].id
      }
    }catch(error){console.log(error)}
    return null
  }

  const createWithNewLocation = async() => {
    const newLocationId = await LocationQuery.createNew( user.id, labels.location )
    const newPermissionId = newLocationId ? await PermissionQuery.createNew( user.id, true ) : null
    if( newLocationId && newPermissionId ){
      return await saveEntry( labels.name, user.id, newLocationId, newPermissionId )
    }
    return null
  }

  const createWithOldLocation = async() => {
    const locationIdExists = await LocationQuery.findOne({id:labels.location.id})
    const newPermissionId = locationIdExists ? await PermissionQuery.createNew( user.id, true ) : null
    if( locationIdExists && newPermissionId ){
      return await saveEntry( labels.name, user.id, labels.location.id, newPermissionId )
    }
  }

  if( Utils.varExists(labels) ){
    if( Utils.varExists(labels.location.id) ){
      return await createWithOldLocation()
    }else if( Utils.varExists(labels.location.name) ){
      return await createWithNewLocation()
    }
  }
  return null
}

module.exports = {
  createFile
}