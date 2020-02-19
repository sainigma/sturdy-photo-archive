const Security = require('./../utils/security')
const photoRouter = require('express').Router()
const photoQuery = require('./../queries/photo')

photoRouter.get('/', async(req,res,next)=>{
  const result = await photoQuery.getPublic()
  if( result ){
    console.log(result)
    res.json({photos:result}).status(200).end()
  }
  res.status(400).end()
})

photoRouter.get('/user', async(req,res,next)=>{
  const username = await Security.checkHeaders(req,false)
  if( username ){
    const result = await photoQuery.getOwnedByUser(username)
    if( result ){
      console.log(result)
      res.json({photos:result}).status(200).end()
    }
  }
  res.status(400).end()
})

module.exports = photoRouter