const { Client } = require('pg')
const config = require('./../utils/config')
const client = new Client(config.PSQLCONF)
client.connect()
const Utils = require('./../utils/utils')

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
        (select id from users where users.username = '${params.username}'),
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
      select username, content, date_part('epoch',timestamp) as timestamp from users, comments
      where users.id in(
        select userid from comments
        where comments.id in(
          select
          unnest(comments)
          from photos
          where photos.id = '${params.target}'
        )
      )
      and comments.id in(
        select unnest(comments)
        from photos
        where photos.id = '${params.target}'
      )
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
                return newcomments.rows
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