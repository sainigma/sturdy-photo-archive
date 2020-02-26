import photoService from '../services/photos'

const initialState = {
  selected:{},
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
  }else if( action.type === 'CHANGEVIEW' ){
    let newState = JSON.parse(JSON.stringify(state))
    if( action.newView === 'home' ){
      newState.selected = {}
    }else if( action.newView === 'imageEditor' && action.response ){
      console.log( action.response )
      newState.selected = action.response
    }
    return newState
  }else if( action.type === 'appendComments' ){
    let newState = JSON.parse(JSON.stringify(state))
    newState.selected.comments = action.comments
    return newState
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

export const sendComment = (target, content) => {
  return async dispatch => {
    const response = await photoService.sendComment(target, content)
    if( response ){
      console.log(response.data.comments)
      const comments = response.data.comments
      dispatch({
        type:'appendComments',
        comments
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export default photoReducer