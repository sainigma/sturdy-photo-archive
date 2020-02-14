const Security = require('./../utils/security')
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

  const headersOK = Security.checkHeaders(req, true)

  if( headersOK && req.files ){
    const username = req.body.username
    const photoId = await FileQuery.createFile(username,req.body.labels)
    if( photoId !== null ){
      moveFile(photoId)
    }
  }
  res.status(400).end()
})
module.exports = fileRouter