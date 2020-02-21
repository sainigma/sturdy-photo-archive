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
  if( action.type === 'createPhotoLocation' ){
    newState.createPhoto.location = action.location
    newState.createPhoto.saved.location = true
  }else if( action.type === 'cretePhotoOptions' ){
    newState.createPhoto.name = action.name ? action.name : ''
    newState.createPhoto.daterange.auto = action.daterange.auto
    newState.createPhoto.daterange.start = action.daterange.start ? action.daterange.start : null
    newState.createPhoto.daterange.end = action.daterange.end ? action.daterange.end : null
    newState.createPhoto.privacy = action.privacy ? action.privacy : null
    newState.createPhoto.saved.options = true
  }else if( action.type === 'createPhotoSpecial' ){
    newState.createPhoto.special = action.special
    newState.createPhoto.saved.special = true
  }else if( action.type === 'formlastmodified' ){
    console.log(action.lastModified)
    newState.createPhoto.lastModified = action.lastModified
  }else if( action.type === 'UPLOADPHOTO' ){
    if( action.status === 200 ){
      console.log("create photo reset")
      newState.createPhoto = JSON.parse(JSON.stringify(initialState.createPhoto))
      newState.createPhoto.privacy = state.createPhoto.privacy
    }
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

export default formReducer