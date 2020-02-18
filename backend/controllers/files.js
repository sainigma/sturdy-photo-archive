const Security = require('./../utils/security')
const fileRouter = require('express').Router()
const FileQuery = require('./../queries/file')
const fs = require('file-system')

fileRouter.post('/upload', async(req,res,next)=>{

  const moveFile = (photoId) => {
    const filetype = req.files.image.name.split('.').pop()
    req.files.image.mv( `./photos/${photoId}.${filetype}`, (error) => {
      if( error ) return res.status(500).send(error)
    })
    return res.json({"photoId":photoId}).status(200).end()
  }

  const headersOK = Security.checkHeaders(req, true)
  
  const labelString = req.body.labels

  if( headersOK && req.files ){
    const username = req.body.username
    const fileChecksum =  req.files.image.md5
    const uniqueForUser = await FileQuery.uniqueForUser( username, fileChecksum )
    if( uniqueForUser ){
      console.log("upload ok")
      const photoId = await FileQuery.createFile(username,labelString,fileChecksum)
      if( photoId !== null ){
        return await moveFile(photoId)
      }
    }else{
      return res.status(403).end()
    }
  }
  return res.status(400).end()
})
module.exports = fileRouter