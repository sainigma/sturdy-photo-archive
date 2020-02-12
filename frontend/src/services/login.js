import axios from 'axios'

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

export default {
  newUser,
  login
}