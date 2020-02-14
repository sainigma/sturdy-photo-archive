import axios from 'axios'
import { config } from './general/serviceUtils.js'

const getAll = async(user) => {
  let response
  try{
    response = await axios.get( 'http://localhost:3001/api/locations/all', config(user) )
  }catch(error){
    console.log(error)
    return false
  }
  return response
}

export default {
  getAll
}