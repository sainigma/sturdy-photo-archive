import axios from 'axios'
import { config } from './general/serviceUtils.js'
const rootURI = 'http://localhost:3001'

const getAll = async(user) => {
  let response
  try{
    response = await axios.get( `${rootURI}/api/locations/all`, config(user) )
  }catch(error){
    console.log(error)
    return false
  }
  return response
}

export default {
  getAll
}