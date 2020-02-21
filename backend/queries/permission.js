const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()
const Utils = require('./../utils/utils')

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const privacyObject = (related,public) => {
  return {
    parent:related,
    spouse:related,
    child:related,
    tangential:related,
    friend:public
  }
}

const createNew = async(userId, visibility ) => {
 
  const paramsToUse = () => {
    switch( Utils.varExists(visibility) ? visibility : 'private' ){
    case 'public':
      return privacyObject(-1,-1)
    case 'hidden':
      return privacyObject(0,0)
    default: //private
      return privacyObject(-1,0)
  }}

  const newPermissionQuery = (params) => {
    return getQuery(`
      INSERT INTO permissions ( id, owner, parent, spouse, child, tangential, friend )
      VALUES( uuid_generate_v4(), '${userId}', ${params.parent}, ${params.spouse}, ${params.child}, ${params.tangential}, ${params.friend} )
      RETURNING id
    `)
  }

  try{
    const result = await newPermissionQuery( paramsToUse() )
    if( result.rows.length > 0 ){
      return result.rows[0].id
    }
  }catch(error){console.log(error)}
  return null
}

module.exports = {
  createNew
}