const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()
const Utils = require('./../utils/utils')

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const remove = async(username,target,id) => {
  const removeLabel = (params) => {
    return getQuery(`
    update photos
    set labels = array_remove(labels,'${Utils.sanitize(params.id,"string")}')
    where id = '${Utils.sanitize(params.target,"string")}'
    and(
      username_to_uuid('${Utils.sanitize(params.username,"string")}') = owner
      or username_to_uuid('${Utils.sanitize(params.username,"string")}') = uploader
      or username_to_uuid('${Utils.sanitize(params.username,"string")}') = any (people) 
    )
    returning labeluuids_to_labels(labels) as labels
    `)
  }
  const result = await removeLabel({username, target, id})
  if( result.rowCount > 0 ) return result.rows[0].labels
  return false
}

const addNew = async(username,target,content) => {

  const getExistingLabel = (params) => {
    return getQuery(`
      select id from labels where name = '${Utils.sanitize(params.content,"string")}'
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
        '${Utils.sanitize(params.content,"string")}'
      )
      returning id
    `)
  }

  const appendLabelToTarget = (params) => {
    return getQuery(`
      update photos
      set labels = array_append(labels,'${Utils.sanitize(params.id,"string")}')
      where id = '${Utils.sanitize(params.target,"string")}'
      and (labels is null or '${Utils.sanitize(params.id,"string")}' != any (labels))
      and(
        username_to_uuid('${Utils.sanitize(params.username,"string")}') = owner
        or username_to_uuid('${Utils.sanitize(params.username,"string")}') = uploader
        or username_to_uuid('${Utils.sanitize(params.username,"string")}') = any (people) 
      )
      returning labeluuids_to_labels(labels) as labels
    `)
  }
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
  addNew,
  remove
}