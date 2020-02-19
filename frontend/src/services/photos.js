import axios from 'axios'
import {config} from './general/serviceUtils'

const getPublic = async() => {
  let response
  try{
    response = await axios.get( 'http://localhost:3001/api/photos/' )
  }catch(error){
    return false
  }
  return response
}

const getOwned = async(user) => {
  let response
  try{
    response = await axios.get('http://localhost:3001/api/photos/user', config(user))
    return response
  }catch(error){
    console.log(error)
  }
  return false
}

export default{
  getPublic,
  getOwned
}