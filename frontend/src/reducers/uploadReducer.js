import uploadService from '../services/upload'

const initialState = {
  status:"0"
}

const uploadReducer = (state = initialState, action) => {
  console.log(action)
  return state
}

export const uploadFile = (user, fileToUpload, labels) => {
  return async dispatch => {
    const response = await uploadService.uploadFile(user, fileToUpload, labels)
    console.log(response)
    dispatch({
      type: 'UPLOADPHOTO'
    })
  }
}

export default uploadReducer