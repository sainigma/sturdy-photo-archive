import axios from 'axios'
import {config} from './general/serviceUtils'

const newUser = async(username,password,email) => {
  const content = {
    username:username,
    password:password,
    email:email,
  }
  const response = await axios.post('http://localhost:3001/api/users/new', content)
  return response
}

const login = async(username,password) => {
  const content = {
    username:username,
    password:password,
  }
  let response
  try{
    response = await axios.post('http://localhost:3001/api/users/login', content)
  } catch (error) {
    response = {
      data:{
        username
      },
      status:error.response.status
    }
  }
  return response  
}

const test = async(user) => {
  if( user.username && user.token ){
    try{
      const response = await axios.get('http://localhost:3001/api/users/test', config(user))
      return response
    }catch(error){}
  }
  return false
}

export default {
  newUser,
  login,
  test
}