const { Client } = require('pg')
const User = require('./user')
const LocationQuery = require('./location')
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
  const newFileQuery = (name, owner, location) => {
    return getQuery(`
      INSERT INTO photos (id, name, owner, uploader, location, locheight, localtitude, locazimuth, locoffsetx, locoffsety, equirectangular )
      VALUES( uuid_generate_v4(), ${Utils.apostrophize(name)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(owner)}, ${Utils.apostrophize(location)}, 0, 0, 0, 0, 0, false )
      RETURNING id
    `)
  }

  if( Utils.varExists(labels) ){
    if( Utils.varExists(labels.location.id)){
      //olemassaoleva
      console.log("wanha")
      console.log(process.env.PSQLCONF)
    }else if( Utils.varExists(labels.location.name) ){
      const newLocationId = await LocationQuery.createNew( user.id, labels.location )
      if( newLocationId ){
        try{
          const result = await newFileQuery(labels.name, user.id, newLocationId)
          if( result.rows.length > 0 ){
            return result.rows[0].id
          }
        }catch(error){console.log(error)}
      }
    }
  }
  return null
}

module.exports = {
  createFile
}