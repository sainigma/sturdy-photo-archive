const Security = require('./../utils/security')
const locationRouter = require('express').Router()
const LocationQuery = require('./../queries/location')

locationRouter.get('/all', async(req,res,next)=>{
  const headersOK = await Security.checkHeaders(req,true)
  if( headersOK ){
    const result = await LocationQuery.getAll()
    if( result ){
      res.json({locations:result}).status(200).end()
    }
  }
  res.status(400).end()
})

module.exports = locationRouter