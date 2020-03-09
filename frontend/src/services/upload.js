import axios from 'axios'
import { config } from './general/serviceUtils.js'

const uploadFile = async(user, fileToUpload, labels) => {
  
  let formData = new FormData()

  formData.append("image", fileToUpload)
  formData.append("username", user.username)
  formData.append("labels", JSON.stringify( labels ))

  console.log(labels)
  let response
  try{
    response = await axios.post( 'http://localhost:3001/api/files/upload', formData, config(user))
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