const initialState = {
  createPhoto:{
    name:'',
    location:{
      name:'',
      address:null,
      postalcode:null,
      city:null,
      latitude:null,
      longitude:null,
      id:null
    },
    daterange:{
      auto:true,
      start:null,
      end:null,
    },
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
  if( action.type === 'location' ){
    newState.createPhoto.location.name = action.location.name ? action.location.name : ''
    newState.createPhoto.location.address = action.location.address ? action.location.address : null
    newState.createPhoto.location.postalcode = action.location.postalcode ? action.location.postalcode : null
    newState.createPhoto.location.city = action.location.city ? action.location.city : null
    newState.createPhoto.location.latitude = action.location.latitude ? action.location.latitude : null
    newState.createPhoto.location.longitude = action.location.longitude ? action.location.longitude : null
    newState.createPhoto.location.id = action.location.id ? action.location.id : null
    newState.createPhoto.saved.location = true
  }else if( action.type === 'options' ){
    newState.createPhoto.name = action.name ? action.name : ''
    newState.createPhoto.daterange.auto = action.daterange.auto
    newState.createPhoto.daterange.start = action.daterange.start ? action.daterange.start : null
    newState.createPhoto.daterange.end = action.daterange.end ? action.daterange.end : null
    newState.createPhoto.saved.options = true
  }else if( action.type === 'special' ){
    newState.createPhoto.special.panorama = action.special.panorama ? action.special.panorama : false
    newState.createPhoto.special.equirectangular = action.special.equirectangular ? action.special.equirectangular : false
    newState.createPhoto.special.height = action.special.height ? action.special.height : null
    newState.createPhoto.special.xoffset = action.special.xoffset ? action.special.xoffset : null
    newState.createPhoto.special.yoffset = action.special.yoffset ? action.special.yoffset : null
    newState.createPhoto.special.azimuth = action.special.azimuth ? action.special.azimuth : null
    newState.createPhoto.special.altitude = action.special.altitude ? action.special.altitude : null
    newState.createPhoto.saved.special = true
  }else if( action.type === 'lastmodified' ){
    console.log(action.lastModified)
    newState.createPhoto.lastModified = action.lastModified
  }else if( action.type === 'RESETCREATEPHOTO' ){
    newState.createPhoto = JSON.parse(JSON.stringify(initialState.createPhoto))
  }
  return newState
}

export const saveLastModified = (lastModified) => {
  return{
    type: 'lastmodified',
    lastModified
  }
}
export const resetCreatephoto = () => {
  return{
    type: 'RESETCREATEPHOTO'
  }
}


export const setLocation = (location, subtype) => {
  return{
    type: 'location',
    location
  }
  /*
  if( subtype !== 'id'){
    return{
      type: 'location',
      location
    }
  }else{
    console.log(location)
    //hae nimi, sitten dispatch
    const fetchedData = data
    return{
      type: 'location',
      location:fetchedData
    }
  }*/
}

export const setSpecial = (special) => {
  return{
    type:'special',
    special
  }
}

export const setOptions = (name, daterange) => {
  return{
    type:'options',
    name,
    daterange
  }
}

export default formReducer