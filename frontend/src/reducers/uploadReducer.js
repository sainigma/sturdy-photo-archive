import uploadService from '../services/upload'

const initialState = {
  status:0
}

const uploadReducer = (state = initialState, action) => {
  if( action.type === 'UPLOADPHOTO' ){
    console.log(action.status)
    return{
      status:action.status
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
      status: response.status
    })
  }
}

export default uploadReducer