const Utils = require('./../utils/utils')
const { Client } = require('pg')
const config = require('./../utils/config')
const PermissionQuery = require('./permission')
const client = new Client(config.PSQLCONF)
client.connect()


const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const getCityID = async( originalCityName, originalCountryName ) => {
  const cityName = originalCityName ? originalCityName : null
  const countryName = originalCountryName ? originalCountryName : null
 
  if( !cityName || cityName === '' ){
    return null
  }

  const fetchIDbyName = () => {
    return getQuery(`
      SELECT id FROM cities
      WHERE name='${Utils.sanitize(cityName,"string")}'
    `)
  }
  const fetchIDbyNameAndCountry = () => {
    return getQuery(`
      SELECT id FROM cities
      WHERE name='${Utils.sanitize(cityName,"string")}'
      AND country='${Utils.sanitize(countryName,"string")}'
    `)
  }
  const insertNewCity = () => {
    return getQuery(`
      INSERT INTO cities ( id, name, country )
      VALUES ( uuid_generate_v4(), '${Utils.sanitize(cityName,"string")}', ${Utils.apostrophize(countryName)} )
    `)
  }

  const findCityID = async() => {
    let id = null
    let hasErrors = false
    if( cityName && countryName ){
      try{
        const query = await fetchIDbyNameAndCountry()
        if( query.rows.length>0 ){
          id = query.rows[0]
        }
      }catch(error){console.log(error);hasErrors=true}
    } else if( cityName ){
      try{
        const query = await fetchIDbyName()
        if( query.rows.length>0 ){
          id = query.rows[0]
        }
      }catch(error){console.log(error);hasErrors=true}
    }
    
    if( hasErrors || id === null ){return false}
    else return id
  }
  const createCity = async() => {
    let hasErrors = false
    try{
      const query = await insertNewCity()
    }catch(error){console.log(error); hasErrors = true }
    return hasErrors
  }

  let cityId = await findCityID()
  if( !cityId ){
    cityId = await createCity()
    cityId = await findCityID()
  }

  if( cityId ) return cityId.id
  else return null
}

const findOne = async(params) => {
  const id = params.id ? params.id : "null"
  let location = null
  try {
    const query = await client.query(`
      SELECT name FROM locations
      WHERE id='${Utils.sanitize(id,"string")}'
    `)
    location = query.rows[0]
  } catch(error){ if(error.routine!=="errorMissingColumn")console.log(error); location=null }
  return location
}

const getAll = async() => {
  const getAllQuery = () => {
    return getQuery(`
    SELECT id,name FROM locations
  `)
  }
  try {
    const result = await getAllQuery()
    if( result.rows.length > 0 ){
      return result.rows
    }
  } catch(error){ console.log(error)}
}

const getPublic = async() => {
  const getPublicQuery = () => {
    return getQuery(`
      select id,name from locations
      where (select friend from permissions where permissions.id = locations.permission) = -1
    `)
  }
  try {
    const result = await getPublicQuery()
    if( result.rowCount > 0 ){
      return result.rows
    } 
  }catch(error){ console.log(error)}
}

const createNew = async(userId, params) => {
  const name = params.name
  const owner = userId
  const latitude = params.latitude ? params.latitude : null
  const longitude = params.longitude ? params.longitude : null
  const address = params.address ? params.address : null
  const postalCode = params.postalCode ? params.postalCode.toString() : null
  const cityId = await getCityID( params.city, params.country )
  const permissions = await PermissionQuery.createNew( userId, ( params.privacy ? params.privacy : "private" ), false )
  console.log(permissions)

  const newLocationQuery = () => {
    return getQuery(`
      INSERT INTO locations ( id, name, owner, latitude, longitude, address, postalcode, city, permission )
      VALUES( uuid_generate_v4(), '${Utils.sanitize(name,"string")}', '${Utils.sanitize(owner,"string")}', ${Utils.apostrophize(latitude)}, ${Utils.apostrophize(longitude)}, ${Utils.apostrophize(address)}, ${Utils.apostrophize(postalCode)}, ${Utils.apostrophize(cityId)}, ${Utils.apostrophize(permissions)} )
      RETURNING id
    `)
  }
  
  try {
    const result = await newLocationQuery()
    if (result.rows.length > 0) {
      return result.rows[0].id
    }
  } catch (error) { console.log(error) }
  return null
}

module.exports = {
  findOne,
  createNew,
  getAll,
  getPublic
}