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

const fetchSingle = async(id, user) => {
  let response
  try{
    response = await axios.get(`http://localhost:3001/api/photos/${id}`, config(user))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

const sendComment = async(target,content) => {
  const user = getUser()
  if( !user )return false
  let response
  let formData = new FormData()
  formData.append("target",target)
  formData.append("content",content)
  console.log(`${target} ${content}`)
  try{
    response = await axios.post('http://localhost:3001/api/comments/', formData, config(user))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

export default{
  getPublic,
  getOwned,
  fetchSingle,
  sendComment
}