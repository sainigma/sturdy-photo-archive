const jwt = require('jsonwebtoken')
const fileRouter = require('express').Router()
const FileQuery = require('./../queries/file')
//const config = require('./../utils/config')

fileRouter.post('/upload', async(req,res,next)=>{
  const request = await req
  
  const headersOK = () => {
    if( request && request.headers ){
      const decodedToken = jwt.verify( request.headers.authorization.slice(8), process.env.SECRET )
      if( !decodedToken || decodedToken.username !== request.body.username ) return false
      else return true
    }else return false
  }
  if( headersOK() && request.files ){
    const username = request.body.username
    const user = await FileQuery.createFile(username,request.body.labels)
    res.json({ user:JSON.stringify(user), status:200 })
  }
  res.status(200).end()
})
module.exports = fileRouter