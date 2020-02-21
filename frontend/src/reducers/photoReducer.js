import photoService from '../services/photos'

const initialState = {
  public:[],
  owned:[],
  initialized:false
}

const photoReducer = (state=initialState, action) => {
  if( action.type === 'initializePublic' ){
    return{
      public:action.photos,
      owned:[],
      initialized:true
    }
  }else if( action.type === 'initializeOwnedPhotos'){
    return{
      public:JSON.parse(JSON.stringify(state.public)),
      owned:action.owned,
      initialized:true
    }
  }else if( action.type === 'UPLOADPHOTO'){
    if( action.status === 200 ){
      let newState = JSON.parse(JSON.stringify(state))
      newState.owned = [ ...newState.owned, action.data.photo ]
      return newState
    }
  }
  return state
}

export const initializePhotos = () => {
  return async dispatch => {
    const response = await photoService.getPublic()
    if( response ){
      console.log(response)
      dispatch({
        type:'initializePublic',
        photos:response.data.photos,
        locations:response.data.locations
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
        type:'initializeOwnedPhotos',
        owned:response.data.photos
      })
    }else{
      dispatch({
        type:'ERROR'
      })
    }
  }
}

export default photoReducer