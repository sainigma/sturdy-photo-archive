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
      start:null,
      end:null
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
    saved:{
      name:false,
      location:false,
      daterange:false,
      special:false,
    }
  }
}

const formReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  console.log(action)
  if( action.type === 'name'){
    newState.createPhoto.name = action.name
    newState.createPhoto.saved.name = true
  }else if( action.type === 'location' ){
    newState.createPhoto.location.name = action.location.name ? action.location.name : ''
    newState.createPhoto.location.address = action.location.address ? action.location.address : null
    newState.createPhoto.location.postalcode = action.location.postalcode ? action.location.postalcode : null
    newState.createPhoto.location.city = action.location.city ? action.location.city : null
    newState.createPhoto.location.latitude = action.location.latitude ? action.location.latitude : null
    newState.createPhoto.location.longitude = action.location.longitude ? action.location.longitude : null
    newState.createPhoto.location.id = action.location.id ? action.location.id : null
    newState.createPhoto.saved.location = true
  }else if( action.type === 'daterange' ){
    newState.createPhoto.daterange.start = action.daterange.start ? action.daterange.start : null
    newState.createPhoto.daterange.end = action.daterange.end ? action.daterange.end : null
    newState.createPhoto.saved.daterange = true
  }else if( action.type === 'special' ){
    newState.createPhoto.special.panorama = action.special.panorama ? action.special.panorama : false
    newState.createPhoto.special.equirectangular = action.special.equirectangular ? action.special.equirectangular : false
    newState.createPhoto.special.height = action.special.height ? action.special.height : null
    newState.createPhoto.special.xoffset = action.special.xoffset ? action.special.xoffset : null
    newState.createPhoto.special.yoffset = action.special.yoffset ? action.special.yoffset : null
    newState.createPhoto.special.azimuth = action.special.azimuth ? action.special.azimuth : null
    newState.createPhoto.special.altitude = action.special.altitude ? action.special.altitude : null
    newState.createPhoto.saved.special = true
  }
  return newState
}

export const setName = (name) => {
  return{
    type:'name',
    name
  }
}

export const setLocation = (data, subtype) => {
  if( subtype !== 'id'){
    return{
      type: 'location',
      location
    }
  }else{
    //hae nimi, sitten dispatch
    const fetchedData = data
    return{
      type: 'location',
      location:fetchedData
    }
  }
}

export const setDaterange = (daterange) => {
  if( daterange.start ){
    return{
      type: 'daterange',
      daterange:{
        start:daterange.start,
        end:daterange.end ? daterange.end : null
      }
    }
  }else return{
    type: 'null'
  }
}

export const setSpecial = (special) => {
  return{
    type:'special',
    special
  }
}


export default formReducer