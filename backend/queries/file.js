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
  console.log( labels )
  const newFileQuery = (name, owner, location, permission) => {
    return getQuery(`
      INSERT INTO photos (id, name, owner, uploader, location, locheight, localtitude, locazimuth, locoffsetx, locoffsety, priority, panorama, equirectangular, permissions )
      VALUES( uuid_generate_v4(), ${Utils.apostrophize(name)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(location)}, 0, 0, 0, 0, 0, 1, false, false, ARRAY[${Utils.apostrophize(permission)}::uuid] )
      RETURNING id
    `)
  }

  const saveEntry = async(name, userid, locationid, permissionid) => {
    try{
      const result = await newFileQuery(name, userid, locationid, permissionid)
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
    if( Utils.varExists(labels.location.id)){
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