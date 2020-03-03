import photoService from '../services/photos'

const initialState = {
  selected:{},
  public:[],
  owned:[],
  searchresult:[],
  initialized:false
}

const photoReducer = (state=initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'initializePublic' ){
    return{
      public:action.photos,
      owned:[],
      searchresult:[],
      initialized:true
    }
  }else if( action.type === 'initializeUser'){
    return{
      public:JSON.parse(JSON.stringify(state.public)),
      owned:action.owned,
      searchresult:[],
      initialized:true
    }
  }else if( action.type === 'UPLOADPHOTO'){
    if( action.status === 200 ){
      newState.owned = [ ...newState.owned, action.data.photo ]
      return newState
    }
  }else if( action.type === 'CHANGEVIEW' ){
    if( action.newView === 'home' || action.newView === 'previous' ){
      newState.selected = {}
    }return newState
  }else if( action.type === 'appendComments' ){
    newState.selected.comments = action.comments
    return newState
  }else if( action.type === 'appendLabels' ){
    newState.selected.labels = action.labels
    return newState
  }else if( action.type === 'UPDATESELECTED' ){
    newState.selected = action.response
    return newState
  }else if( action.type === 'searchresults' ){
    newState.searchresult = action.searchresult
    console.log(newState)
    return newState
  }
  return state
}

export const initializePhotos = () => {
  return async dispatch => {
    const response = await photoService.getPublic()
    if( response ){
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

export const updateSelected = (photoId,user) => {
  return async dispatch => {
    const response = await photoService.fetchSingle(photoId, user)
    if( response ){
      //console.log( response.data.result[0] )
      dispatch({
        type: 'UPDATESELECTED',
        response: response.data.result[0]
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
        type:'initializeUser',
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
    const response = await photoService.sendInfo(target, content, 'comment')
    if( response ){
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

export const newLabel = (target, content) => {
  return async dispatch => {
    const response = await photoService.sendInfo(target, content, 'label')
    if( response ){
      const labels = response.data.labels
      dispatch({
        type:'appendLabels',
        labels
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const conductSearch = (options) => {
  return async dispatch => {
    const response = await photoService.search(options)
    if( response && response.status === 200 ){
      const searchresult = response.data.searchresult
      dispatch({
        type:'searchresults',
        searchresult
      })
    }else{
      dispatch({
        type:'previous'
      })
    }
  }
}

export default photoReducer