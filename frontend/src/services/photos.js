import axios from 'axios'
import {config, getUser} from './general/serviceUtils'

const getPublic = async() => {
  let response
  try{
    response = await axios.get( 'http://localhost:3001/api/photos/' )
  }catch(error){
    return false
  }
  return response
}

const getOwned = async(newuser) => {
  let response
  try{
    response = await axios.get('http://localhost:3001/api/photos/user', config(newuser))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

const fetchSingle = async(id, userOut) => {
  let user = userOut ? userOut : getUser()
  let response
  try{
    response = await axios.get(`http://localhost:3001/api/photos/${id}`, config(user))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

const sendInfo = async(target,content,type,additive) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  formData.append("target",target)
  formData.append("content",content)
  formData.append("additive",additive)
  try{
    response = await axios.post(`http://localhost:3001/api/info/${type}`, formData, config(user))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

const search = async(options) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  formData.append("searchterms",JSON.stringify(options.searchterms))
  try{
    response = await axios.post(`http://localhost:3001/api/photos/search`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const changeLocation = async(photoId, destination) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()

  formData.append("type","location")
  formData.append("photoId",photoId)
  formData.append("destination",destination)
  try{
    response = await axios.post(`http://localhost:3001/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

export default{
  getPublic,
  getOwned,
  fetchSingle,
  sendInfo,
  search,
  changeLocation
}