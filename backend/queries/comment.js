const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()

const getQuery = (sqlcommand) => {
  return client.query(sqlcommand)
}

const addNew = async(username,target,content) => {
  const newCommentQuery = (params) => {
    return getQuery(`
      insert into comments ( 
        userid,
        id,
        content,
        timestamp
      )
      values( 
        username_to_uuid('${params.username}'),
        uuid_generate_v4(),
        '${params.content}',
        now()
      )
      returning id
    `)
  }
  const appendCommentToTarget = (params) => {
    return getQuery(`
      update photos
      set comments = array_append(comments,'${params.newCommentId}')
      where id = '${params.target}'
      returning id
    `)
  }
  const fetchComments = (params) => {
    return getQuery(`
      select
        commentuuids_to_comments(comments) as comments
        from photos
      where photos.id = '${params.target}'
    `)
  }

  try{
    const commentresult = await newCommentQuery({username,content})
    if( commentresult.rowCount > 0 ){
      const newCommentId = commentresult.rows[0].id
      if( newCommentId ){
        try{
          const linkresult = await appendCommentToTarget({newCommentId,target})
          if( linkresult ){
            try{
              const newcomments = await fetchComments({target})
              if( newcomments.rowCount > 0 ){
                return newcomments.rows[0].comments
              }
            }catch(error){}
          }
        }catch(error){}
      }
    }
  }catch(error){}
  return false
}

module.exports = {
  addNew
}