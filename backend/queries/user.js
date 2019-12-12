const bcrypt = require('bcryptjs')
const { Client } = require('pg')

const client = new Client({
  user: 'sturdy-photo-archive',
  host: '192.168.0.104',
  database: 'sturdy-photo-archive',
  password: 'salasana',
  port: 5432
})

client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
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

  console.log(user)
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
      SELECT username FROM users 
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
}