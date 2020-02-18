const Security = require('./../utils/security')
const photoRouter = require('express').Router()
const photoQuery = require('./../queries/photo')

photoRouter.get('/user', async(req,res,next)=>{
  const headersOK = await Security.checkHeaders(req,false)
  if( headersOK ){
    const result = await photoQuery.getOwnedByUser()
    if( result ){
      res.json({locations:result}).status(200).end()
    }
  }else{
    //hae julkiset kuvat
  }
  res.status(400).end()
})

module.exports = photoRouter