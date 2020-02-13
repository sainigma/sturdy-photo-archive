const jwt = require('jsonwebtoken')
const fileRouter = require('express').Router()
//const User = require('./../queries/user')
const config = require('./../utils/config')

fileRouter.post('/upload', async(req,res,next)=>{
  const request = await req
  if( request.files ){
    console.log( request.headers )
  }
  res.status(200).end()
})
module.exports = fileRouter