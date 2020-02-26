const Security = require('./../utils/security')
const photoRouter = require('express').Router()
const photoQuery = require('./../queries/photo')
const LocationQuery = require('./../queries/location')

photoRouter.get('/', async(req,res,next)=>{
  const photosResult = await photoQuery.getPublic()
  const locationsResult = await LocationQuery.getPublic()
  if( photosResult && locationsResult ){
    res.json({photos:photosResult, locations:locationsResult}).status(200).end()
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

photoRouter.get('/:id', async(req,res,next)=>{
  //const username = await Security.checkHeaders(req,false)

  let username
  try{
    username = await Security.checkHeaders(req,false)
  }catch(error){
    username=undefined
  }
  //sanitize!
  const id = req.params.id
  if( id ){
    const result = await photoQuery.getSingle(username,id)
    if( result ){
      console.log(`${username} fetched image info`)
      console.log(result)
      res.json({result}).status(200).end()
    }
  }
  res.status(400).end()
})

module.exports = photoRouter