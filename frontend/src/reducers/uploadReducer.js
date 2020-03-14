import uploadService from '../services/upload'

const initialState = {
  status:0,
  photo:null,
  timestamp:0
}

const uploadReducer = (state = initialState, action) => {
  if( action.type === 'UPLOADPHOTO' ){
    console.log(action.status)
    if( action.status !== 400 ){
      return{
        status:action.status,
        timestamp:Date.now(),
        photo:action.data.photo
      }
    }else return{
      status:400,
      timestamp:0,
      photo:null
    }
  }else if( action.type === 'RESET' ){
    return{
      status:0
    }
  }
  return state
}

export const uploadReset = () => {
  return{
    type:'RESET'
  }
}

export const uploadFile = (user, fileToUpload, labels) => {
  return async dispatch => {
    const response = await uploadService.uploadFile(user, fileToUpload, labels)
    console.log(response)
    dispatch({
      type: 'UPLOADPHOTO',
      data: response.data,
      status: response.status
    })
  }
}

export default uploadReducer