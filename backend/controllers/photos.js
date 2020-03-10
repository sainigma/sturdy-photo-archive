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
      res.json({result}).status(200).end()
    }
  }
  res.status(400).end()
})

photoRouter.post('/search', async(req,res,next)=>{
  const getType = (terms, type) => {
    return terms.filter( term => term.type===type )
  }

  let username
  try{
    username = await Security.checkHeaders(req,false)
  }catch(error){
    username=undefined
  }

  if( username ){
    //sanitize!
    const searchterms = JSON.parse(req.body.searchterms)

    const labels = getType(searchterms,'label')
    const locations = getType(searchterms,'location')
    if( labels || locations ){
      const result = await photoQuery.search(username,labels,locations)
      if( result ){
        res.json({searchresult:result}).status(200).end()
      }
    }
  }
  
  res.status(400).end()
})

photoRouter.post('/modify', async(req,res,next) => {
  let username
  try{
    username = await Security.checkHeaders(req,false)
  }catch(error){
    username=undefined
  }
  let result = false
  if( username ){
    //sanitize!
    const type = req.body.type
    
    switch(type){
      case 'location':
        const photoId = req.body.photoId
        const destination = req.body.destination !== 'null' ? req.body.destination : null
        result = await photoQuery.changeLocation( username, photoId, destination )
        break
      default:
        break
    }
  }

  if( result ) res.status(200).end()
  res.status(400).end()
})

module.exports = photoRouter