let initialState = {
  createPhoto:{
    name:'',
    location:{
      name:'',
      address:null,
      postalcode:null,
      city:null,
      latitude:null,
      longitude:null,
      privacy:'private',
      id:null
    },
    daterange:{
      auto:true,
      start:null,
      end:null,
    },
    privacy:'private',
    special:{
      panorama:false,
      equirectangular:false,
      height:null,
      xoffset:null,
      yoffset:null,
      azimuth:null,
      altitude:null
    },
    lastModified:null,
    saved:{
      options:false,
      location:false,
      special:false,
    }
  }
}

const formReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type){
    case 'createPhotoLocation':
      newState.createPhoto.location = action.location
      newState.createPhoto.saved.location = true
      break
    case 'createPhotoOptions':
      newState.createPhoto.name = action.name ? action.name : ''
      newState.createPhoto.daterange.auto = action.daterange.auto
      newState.createPhoto.daterange.start = action.daterange.start ? action.daterange.start : null
      newState.createPhoto.daterange.end = action.daterange.end ? action.daterange.end : null
      newState.createPhoto.privacy = action.privacy ? action.privacy : null
      newState.createPhoto.saved.options = true
      break
    case 'createPhotoSpecial':
      newState.createPhoto.special = action.special
      newState.createPhoto.saved.special = true
      break
    case 'formlastmodified':
      newState.createPhoto.lastModified = action.lastModified
      break
    case 'UPLOADPHOTO':
      if( action.status === 200 ){
        newState.createPhoto = JSON.parse(JSON.stringify(initialState.createPhoto))
        newState.createPhoto.privacy = state.createPhoto.privacy
      }
      break
    case 'updateLocation':
    case 'formreset':
      newState.createPhoto = JSON.parse(JSON.stringify(initialState.createPhoto))
      newState.createPhoto.privacy = state.createPhoto.privacy
      break
    case 'saveLocationForPhoto':
      break
  }
  return newState
}

export const saveLastModified = (lastModified) => {
  return{
    type: 'formlastmodified',
    lastModified
  }
}

export const setLocation = (location, subtype) => {
  return{
    type: 'createPhotoLocation',
    location
  }
}

export const setSpecial = (special) => {
  return{
    type:'createPhotoSpecial',
    special
  }
}

export const setOptions = (name, daterange, privacy) => {
  return{
    type:'cretePhotoOptions',
    name,
    daterange,
    privacy
  }
}

export const formReset = () => {
  return{
    type:'formreset'
  }
}

export const saveLocationForPhoto = () => {
  return{
    type:'saveLocationForPhoto'
  }
}

export default formReducer