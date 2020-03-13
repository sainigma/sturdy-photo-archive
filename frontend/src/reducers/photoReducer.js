import photoService from '../services/photos'

const initialState = {
  selected:{},
  public:[],
  owned:[],
  searchresult:[],
  initialized:false,
  sorting:'none'
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
  let sendNewState = false
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
        sendNewState = true
      }
      break
    case 'CHANGEVIEW':
      if( action.newView === 'home' || action.newView === 'previous' ){
        newState.selected = {}
        if( action.newView === 'home' ){
          newState.searchresult = []
        }
      }
      sendNewState = true
      break
    case 'appendComments':
      newState.selected.comments = action.comments
      sendNewState = true
      break
    case 'updateLabels':
      newState.selected.labels = action.labels
      sendNewState = true
      break
    case 'searchresults':
      newState.searchresult = action.searchresult
      sendNewState = true
      break
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
      sendNewState = true
      break
    case 'UPDATESELECTED':
      newState.selected = action.response
      sendNewState = true
      break
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
      sendNewState = true
      break
    case 'setSorting':
      newState.sorting = action.value
      sendNewState = true
      break
    case 'updatePermissions':
      sendNewState = false
      break
    case 'hasLiked':
      sendNewState = true
      newState.owned = state.owned.map( photo=> {
        let result = photo
        if( photo.id === action.photoId ){
          photo.likecount += action.liked ? 1 : -1
        }
        return result
      })
      break
  }

  if( sendNewState ){
    if( newState.sorting === 'none' || newState.sorting === undefined ) return newState

    const ascending = newState.sorting.includes('ascending')
    const sortFunction = (value1, value2, ascending) => {
      if( value1 < value2 ) return !ascending
      return ascending
    }
    console.log('sort')
    if( newState.sorting.includes('date') ){
      newState.owned = newState.owned.sort( (a,b) => { return sortFunction(a.daterange[0],b.daterange[0],ascending) } )
    } else if( newState.sorting.includes('labelcount') ){
      newState.owned = newState.owned.sort( (a,b) => { return sortFunction(a.labelcount,b.labelcount,ascending) } )
    } else if( newState.sorting.includes('likes') ){
      newState.owned = newState.owned.sort( (a,b) => { return sortFunction(a.likecount,b.likecount,ascending) } )
    }

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



export const changeLocation = ( photoId, location ) => {
  if( ( location !== null && location.id !== undefined ) || location === null ){
    console.log("olemassaoleva")
    console.log( location )
    return async dispatch => {
      const response = await photoService.changeLocation(
        photoId, location !== null ? location.id : 'null' )

      if( response && response.status === 200 ){
        dispatch({
          type:'updateLocation',
          id: photoId,
          location: location !== null 
            ? {
                id: location.id,
                name: location.name
              }
            : null
        })
      }else{
        dispatch({
          type:'ERROR'
        })
      }
    }
  }else{
    return async dispatch => {
      const response = await photoService.createLocation( photoId, location )
      if( response && response.status === 200 ){
        dispatch({
          type:'updateLocation',
          id: photoId,
          location: response.data.location
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

export const sortPhotos = (value) => {
  return{
    type:'setSorting',
    value
  }
}

export const updatePermissions = (id, values) => {
  return async dispatch => {
    const response = await photoService.changePermissions(id, values)
    if( response && response.status === 200 ){
      dispatch({
        type:'updatePermissions',
        values
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const toggleLike = (photoId,liked) => {
  return async dispatch => {
    const response = await photoService.toggleLike(photoId)
    if( response && response.status === 200 ){
      dispatch({
        type:'hasLiked',
        photoId,
        liked
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const changeDescription = (photoId,description) => {
  return async dispatch => {
    const response = await photoService.changeDescription(photoId,description)
    if( response && response.status === 200 ){
      dispatch({
        type:'descriptionChanged'
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const modifyDate = (photoId,newDate) => {
  return async dispatch => {
    const response = await photoService.changeDate(photoId,newDate)
    if( response && response.status === 200 ){
      dispatch({
        type:'dateChanged'
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const modifyTitle = (photoId,title) => {
  return async dispatch => {
    const response = await photoService.changeTitle(photoId,title)
    if( response && response.status === 200 ){
      dispatch({
        type:'titleChanged'
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export default photoReducer