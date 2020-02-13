import axios from 'axios'

const uploadFile = async(user, fileToUpload, labels) => {
  
  let formData = new FormData()

  formData.append("files", fileToUpload)
  formData.append("username", user.username)
  formData.append("labels", JSON.stringify( labels ))

  content = {
    user,
    files:[fileToUpload],
    labels
  }

  let response
  try{
    response = await axios.post( 'http://localhost:3001/api/files/upload', formData, {
      headers: {
        Authorization: user.token
      }
    })
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