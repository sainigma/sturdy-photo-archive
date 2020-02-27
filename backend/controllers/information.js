const Security = require('../utils/security')
const infoRouter = require('express').Router()
const CommentQuery = require('../queries/comment')
const LabelQuery = require('../queries/label')

infoRouter.post('/comment', async(req,res,next)=>{
  const username = Security.checkHeaders(req, false)
  //sanitize!
  const target = req.body.target
  const content = req.body.content
  console.log(`Uusi kommentti ${username}: ${target}`)
  if( username && target && content ){
    try{
      const response = await CommentQuery.addNew(username,target,content)
      res.json({comments:response}).status(200).end()
    }catch(error){}
  }
  return res.status(400).end()
})

infoRouter.post('/label', async(req,res,next)=>{
  const username = Security.checkHeaders(req, false)
  //sanitize!
  const target = req.body.target
  const content = req.body.content
  if( username && target && content ){
    try{
      const response = await LabelQuery.addNew(username,target,content)
      console.log(response)
      res.json({labels:response}).status(200).end()
    }catch(error){}
  }
  return res.status(400).end()
})

module.exports = infoRouter