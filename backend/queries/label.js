const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const addNew = async(username,target,content) => {

  const getExistingLabel = (params) => {
    return getQuery(`
      select id from labels where name = '${params.content}'
    `)
  }

  const createNewLabel = (params) => {
    return getQuery(`
      insert into labels (
        id,
        name
      )
      values(
        uuid_generate_v4(),
        '${params.content}'
      )
      returning id
    `)
  }

  const appendLabelToTarget = (params) => {
    return getQuery(`
      update photos
      set labels = array_append(labels,'${params.id}')
      where id = '${params.target}'
      and (labels is null or '${params.id}' != any (labels))
      and(
        username_to_uuid('${params.username}') = owner
        or username_to_uuid('${params.username}') = uploader
        or username_to_uuid('${params.username}') = any (people) 
      )
      returning labeluuids_to_labels(labels) as labels
    `)
  }
  console.log("moi!")
  let result = false
  let labelQuery = await getExistingLabel({content})
  if( !labelQuery.rowCount > 0 ){
    labelQuery = await createNewLabel({content}) //toimii
  }
  if( labelQuery.rowCount > 0 ){
    const id = labelQuery.rows[0].id
    console.log
    result = await appendLabelToTarget({username, target, id})
    if( result.rowCount > 0 ){
      result = result.rows[0].labels
    }
  }
  return result
}

module.exports = {
  addNew
}