import photoService from '../services/photos'

const initialState = {
  public:[],
  owned:[]
}

const photoReducer = (state=initialState, action) => {
  if( action.type === 'initializePublicPhotos' ){
    console.log("Public photos initialized")
    return{
      public:action.public,
      owned:[]
    }
  }else if( action.type === 'initializeOwned'){
    return{
      public:JSON.parse(JSON.stringify(state.public)),
      owned:action.owned
    }
  }else if( action.type === 'APPENDPHOTO' ){
    let newState = JSON.parse(JSON.stringify(state))
    newState.owned = [ ...newState.owned, action.photo ]
    return newState
  }
  return state
}

export const initializePhotos = () => {
  return async dispatch => {
    const response = await photoService.getPublic()
    if( response ){
      dispatch({
        type:'initializePublicPhotos',
        public:response.data.photos
      })
    }else{
      dispatch({
        type:'ERROR'
      })
    }
  }
}

export const getOwnedPhotos = (user) => {
  return async dispatch => {
    const response = await photoService.getOwned(user)
    if( response ){
      dispatch({
        type:'initializeOwned',
        owned:response.data.photos
      })
    }else{
      dispatch({
        type:'ERROR'
      })
    }
  }
}

export const appendPhoto = (photo) => {
  return{
    type:'APPENDPHOTO',
    photo
  }
}

export default photoReducer