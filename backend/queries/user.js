const bcrypt = require('bcryptjs')

const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const login = async(username,password) => {
  const fetchUser = () => {
    return getQuery(`
      SELECT hash, active, id FROM users
      WHERE username='${username}'
    `)
  }
  let id = null
  let user = null
  let hash = null
  let active = null
  let hasErrors = false
  let result = null

  try {
    const query = await fetchUser()
    //console.log(query)
    if(query.rows.length>0){
      user = username
      id = query.rows[0].id
      hash = query.rows[0].hash
      active = query.rows[0].active

      result = await bcrypt.compare(password,hash)

    }
  }catch(error){console.log(error);hasErrors=true}

  return {user,hash,active,hasErrors,result}
}

const verify = async(verification) => {

  const fetchUserFromVerifications = () => {
    return getQuery(`
      SELECT username FROM userverification
      WHERE verification='${verification}'
      AND timestamp > NOW() - INTERVAL '60 minutes'
  `)
  }

  const setUserToActive = (username) => {
    return getQuery(`
      UPDATE users
      SET active = TRUE
      WHERE username = '${username}'
    `)
  }

  const removeVerificationsForUser = (username) => {
    return getQuery(`
      DELETE FROM userverification
      WHERE username = '${username}'
    `)
  }

  let user = null
  let hasErrors = false
  try {
    const query = await fetchUserFromVerifications()
    if(query.rows.length>0)user=query.rows[0].username
    else hasErrors=true
  }catch(error){console.log(error);hasErrors=true}

  if(!hasErrors){
    try{ setUserToActive(user) }catch(error){console.log(error);hasErrors=true}
    try{ removeVerificationsForUser(user) }catch(error){console.log(error);hasErrors=true}
  }

  return hasErrors
}

const createNew = async(username,password,email) => {

  const hash = await bcrypt.hash(password,10)
  const verification = await bcrypt.hash(username+password+email,5)
  let hasErrors = false

  try {
    const query = await client.query(`
      INSERT INTO users ( id, username, email, hash, active, alive )
      VALUES ( uuid_generate_v4(), '${username}', '${email}', '${hash}', FALSE, TRUE )
    `)
  }catch(error){console.log(error); hasErrors = true }

  if(!hasErrors) try{
    const query = await client.query(`
      INSERT INTO userverification ( username, verification, timestamp )
      VALUES ( '${username}', '${verification}', now())
    `)
  }catch(error){console.log(error); hasErrors = true }

  return hasErrors
}

const getAll = async() => {
  const res = await client.query('SELECT name FROM users')
  await client.end()
  return res
}

const findOne = async(params) => {
  const username = params.username ? params.username : "null"
  const name = params.name ? params.name : "null"
  const email = params.email ? params.email : "null"

  let user = null
  try {
    const query = await client.query(`
      SELECT username, id FROM users 
      WHERE username='${username}'
      OR name='${name}'
      OR email='${email}'
    `)
    user = query.rows[0]
  } catch(error){ if(error.routine!=="errorMissingColumn")console.log(error); user="error" }
  return user
}

module.exports = {
  getAll,
  findOne,
  createNew,
  verify,
  login,
}