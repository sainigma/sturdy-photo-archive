const Security = require('./../utils/security')
const fileRouter = require('express').Router()
const FileQuery = require('./../queries/file')
const Jimp = require('jimp')

fileRouter.post('/upload', async(req,res,next)=>{

  const generateThumbnail = async(photo) => {
    let thumbnail = await Jimp.read(`./public/photos/${photo.id}.${filetype}`)
    await thumbnail.scaleToFit(256,256).quality(90).writeAsync(`./public/photos/${photo.id}thumb.${filetype}`)
    return true
  }

  const moveFile = async(photo) => {
    await req.files.image.mv( `./public/photos/${photo.id}.${filetype}`, (error) => {
      if( error ) return res.status(500).send(error)
    })
    await generateThumbnail(photo)
    return res.json({"photo":photo}).status(200).end()
  }

  const headersOK = Security.checkHeaders(req, true)
  let filetype = ''
  const labelString = req.body.labels
  if( headersOK && req.files ){
    const username = req.body.username
    const fileChecksum =  req.files.image.md5
    const uniqueForUser = await FileQuery.uniqueForUser( username, fileChecksum )
    filetype = req.files.image.name.split('.').pop()
    if( uniqueForUser ){
      console.log(labelString)
      const photo = await FileQuery.createFile(username,labelString,fileChecksum,filetype)
      if( photo !== null ){
        return await moveFile(photo)
      }
    }else{
      return res.status(403).end()
    }
  }
  return res.status(400).end()
})
module.exports = fileRouter