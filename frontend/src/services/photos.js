import axios from 'axios'
import {config, getUser} from './general/serviceUtils'
const rootURI = 'http://localhost:3001'

const getPublic = async() => {
  let response
  try{
    response = await axios.get( `${rootURI}/api/photos/` )
  }catch(error){
    return false
  }
  return response
}

const getOwned = async(newuser) => {
  let response
  try{
    response = await axios.get(`${rootURI}/api/photos/user`, config(newuser))
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
    response = await axios.get(`${rootURI}/api/photos/${id}`, config(user))
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
    response = await axios.post(`${rootURI}/api/info/${type}`, formData, config(user))
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
    response = await axios.post(`${rootURI}/api/photos/search`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const changePermissions = async(permissionId, values) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  console.log("moi!")
  console.log(values)
  formData.append('type','permissions')
  formData.append('values',JSON.stringify(values))
  formData.append('permissionId',permissionId)
  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
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
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const createLocation = async(photoId, location) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()

  formData.append("type","newlocation")
  formData.append("photoId",photoId)
  formData.append("location",JSON.stringify(location))
  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const toggleLike = async(photoId) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  formData.append("type","like")
  formData.append("photoId",photoId)
  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const changeDescription = async(photoId, description) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  formData.append("type","description")
  formData.append("photoId",photoId)
  formData.append("description",description)
  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const changeDate = async(photoId, newDate) => {
  const user = getUser()
  if( !user )return false
  let response

  const parseDate = newDate.split('/')
  let dateToSend = new Date()
  dateToSend.setFullYear(parseDate[2])
  dateToSend.setMonth(parseDate[1]-1)
  dateToSend.setDate(parseDate[0])

  let formData = new FormData()
  formData.append("type","date")
  formData.append("photoId",photoId)
  formData.append("date",dateToSend/1000)


  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
    return response
  }catch(error){}
  return false
}

const changeTitle = async(photoId,title) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  
  formData.append("type","title")
  formData.append("photoId",photoId)
  formData.append("title",title)

  try{
    response = await axios.post(`${rootURI}/api/photos/modify`, formData, config(user))
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
  changeLocation,
  createLocation,
  changePermissions,
  toggleLike,
  changeDescription,
  changeDate,
  changeTitle
}