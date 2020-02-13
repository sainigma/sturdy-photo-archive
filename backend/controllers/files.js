const jwt = require('jsonwebtoken')
const fileRouter = require('express').Router()
const FileQuery = require('./../queries/file')

fileRouter.post('/upload', async(req,res,next)=>{

  const moveFile = (photoId) => {
    const filetype = req.files.image.name.split('.').pop()
    req.files.image.mv( `./photos/${photoId}.${filetype}`, (error) => {
      if( error ) return res.status(500).send(error)
    })
    return res.status(200).end()
  }

  const headersOK = () => {
    if( req && req.headers ){
      const decodedToken = jwt.verify( req.headers.authorization.slice(8), process.env.SECRET )
      if( !decodedToken || decodedToken.username !== req.body.username ) return false
      else return true
    }else return false
  }
  if( headersOK() && req.files ){
    const username = req.body.username
    const photoId = await FileQuery.createFile(username,req.body.labels)
    if( photoId !== null ){
      moveFile(photoId)
    }
  }
  res.status(400).end()
})
module.exports = fileRouter