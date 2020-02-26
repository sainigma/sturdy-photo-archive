const Security = require('./../utils/security')
const commentRouter = require('express').Router()
const CommentQuery = require('./../queries/comment')

commentRouter.post('/', async(req,res,next)=>{
  const username = Security.checkHeaders(req, false)
  //sanitize!
  const target = req.body.target
  const content = req.body.content
  console.log(`Uusi kommentti ${username}`)
  if( username && target && content ){
    try{
      const response = await CommentQuery.addNew(username,target,content)
      console.log( response )
      res.json({comments:response}).status(200).end()
    }catch(error){}
  }
  return res.status(400).end()
})

module.exports = commentRouter