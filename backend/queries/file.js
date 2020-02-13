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
  //console.log(labels)
  if( Utils.varExists(labels) ){
    if( Utils.varExists(labels.location.id)){
      //olemassaoleva
      console.log("wanha")
      console.log(process.env.PSQLCONF)
    }else if( Utils.varExists(labels.location.name) ){
      const result = await LocationQuery.createNew( user.id, labels.location )
      console.log(result)
    }
  }


  return user
}

module.exports = {
  createFile
}