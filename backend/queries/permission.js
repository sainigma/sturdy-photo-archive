const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()


const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const createNew = async(userId, visible ) => {

  const defaultParams = {
    parent:-1,
    spouse:-1,
    child:-1,
    tangential:-1,
    friend:1
  }

  const hiddenParams = {
    parent:0,
    spouse:0,
    child:0,
    tangential:0,
    friend:0
  }

  const paramsToUse = visible ? defaultParams : hiddenParams

  const newPermissionQuery = (params) => {
    return getQuery(`
      INSERT INTO permissions ( id, owner, parent, spouse, child, tangential, friend )
      VALUES( uuid_generate_v4(), '${userId}', ${params.parent}, ${params.spouse}, ${params.child}, ${params.tangential}, ${params.friend} )
      RETURNING id
    `)
  }

  try{
    const result = await newPermissionQuery(paramsToUse)
    if( result.rows.length > 0 ){
      return result.rows[0].id
    }
  }catch(error){console.log(error)}
  return null
}

module.exports = {
  createNew
}