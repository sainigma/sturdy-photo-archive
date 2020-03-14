import axios from 'axios'
import { config } from './general/serviceUtils.js'
const rootURI = 'http://localhost:3001'

const uploadFile = async(user, fileToUpload, labels) => {
  
  let formData = new FormData()

  formData.append("image", fileToUpload)
  formData.append("username", user.username)
  formData.append("labels", JSON.stringify( labels ))

  console.log(labels)
  let response
  const fileSizeMB = fileToUpload.size / (1024 * 1024)
  if( fileSizeMB > 10 ){
    alert('File too large, limit 10mb')
    return {
      status:400
    }
  }

  try{
    response = await axios.post( `${rootURI}/api/files/upload`, formData, config(user))
  }catch(error){
    response = {
      status:error.response.status
    }
  }
  return response
}

export default {
  uploadFile
}