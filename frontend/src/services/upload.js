import axios from 'axios'

const uploadFile = async(user, fileToUpload, labels) => {
  
  let formData = new FormData()

  formData.append("image", fileToUpload)
  formData.append("username", user.username)
  formData.append("labels", JSON.stringify( labels ))

  const config = () => {
    return {
      headers: { Authorization: user.token,
        'Content-type':'multipart/form-data'
       }
    }
  }

  let response
  try{
    response = await axios.post( 'http://localhost:3001/api/files/upload', formData, config())
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