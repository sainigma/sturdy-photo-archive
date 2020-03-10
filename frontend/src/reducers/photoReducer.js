import photoService from '../services/photos'

const initialState = {
  selected:{},
  public:[],
  owned:[],
  searchresult:[],
  initialized:false
}

const dateInRange = (daterange, range) => {
  return(
    (daterange[0] > range.bottom
    && daterange[0] < range.top)
    || (daterange[1] > range.bottom
    && daterange[1] < range.top)
  )
}

const photoReducer = (state=initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch(action.type){
    case 'initializePublic':
      return{
        public:action.photos,
        owned:[],
        searchresult:[],
        initialized:true
      }
    case 'initializeUser':
      return{
        public:JSON.parse(JSON.stringify(state.public)),
        owned:action.owned,
        searchresult:[],
        initialized:true
      }
    case 'UPLOADPHOTO':
      if( action.status === 200 ){
        newState.owned = [ ...newState.owned, action.data.photo ]
        return newState
      }else break
    case 'CHANGEVIEW':
      if( action.newView === 'home' || action.newView === 'previous' ){
        newState.selected = {}
        if( action.newView === 'home' ){
          newState.searchresult = []
        }
      }
      return newState
    case 'appendComments':
      newState.selected.comments = action.comments
      return newState
    case 'updateLabels':
      newState.selected.labels = action.labels
      return newState
    case 'searchresults':
      newState.searchresult = action.searchresult
      return newState
    case 'updateLocation':
      newState.owned = newState.owned.map( photo => {
        if( photo.id !== action.id ){
          return photo
        }else{
          let modifiedPhoto = JSON.parse(JSON.stringify(photo))
          modifiedPhoto.location = action.location !== null ? action.location.id : null
          return modifiedPhoto
        }
      })
      newState.selected.location = action.location
      console.log(newState)
      return newState
    case 'UPDATESELECTED':
      newState.selected = action.response
      return newState
    case 'setRange':
      newState.owned = state.owned.map( photo =>{
        let result = photo
        result.visible = dateInRange(photo.daterange, action.range)
        return result
      })
      newState.public = state.public.filter( photo =>{
        let result = photo
        result.visible = dateInRange(photo.daterange, action.range)
        return result
      })
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
    if( response.status === 200 ){
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



export const changeLocation = (photoId, destinationId, destinationName) => {
  if( destinationId !== undefined ){
    return async dispatch => {
      const response = await photoService.changeLocation(
        photoId, destinationId !== null ? destinationId : 'null' )
      if( response.status === 200 ){
        dispatch({
          type:'updateLocation',
          id: photoId,
          location: destinationId !== null 
            ? {
                id: destinationId,
                name: destinationName
              }
            : null
        })
      }else{
        dispatch({
          type:'ERROR'
        })
      }
    }
  }
}

export const changeLocationAndDiv = (targetDiv, imgdivId, destination) => {
  return async dispatch => {
    const photoId = imgdivId.slice(10)
    const response = await photoService.changeLocation(
      photoId, destination.id !== null ? destination.id : 'null' )
    if( response.status === 200 ){
      targetDiv.appendChild( document.getElementById(imgdivId) )
    }
    dispatch({
      type:'changeLocation'
    })
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
    const response = await photoService.sendInfo(target, content, 'comment', true)
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
    const response = await photoService.sendInfo(target, content, 'label', 'true')
    if( response.status === 200 ){
      const labels = response.data.labels
      dispatch({
        type:'updateLabels',
        labels
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const removeLabel = (target, labelid) => {
  return async dispatch => {
    const response = await photoService.sendInfo(target, labelid, 'label', 'false')
    if( response.status === 200 ){
      const labels = response.data.labels
      dispatch({
        type:'updateLabels',
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

export const setRange = (bottom,top) => {
  return{
    type:'setRange',
    range:{
      bottom: new Date(bottom,1,1).getTime()/1000,
      top: new Date(top+1,1,1).getTime()/1000
    }
  }
}

export default photoReducer