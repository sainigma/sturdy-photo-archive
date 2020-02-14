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
    }
  }
}

const formReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  console.log(action)
  if( action.type === 'location' ){
    if( action.subtype === 'new' ){
      newState.createPhoto.location = action.data
    }else if( action.subtype === 'id'){
      newState.createPhoto.location = action.data
    }
  }
  return newState
}

export const setLocation = (data, subtype) => {
  if( subtype !== 'id'){
    return{
      type: 'location',
      subtype: 'new',
      data
    }
  }else{
    //hae nimi, sitten dispatch
    const fetchedData = data
    return{
      type: 'location',
      subtype,
      data:fetchedData
    }
  }
}

export default formReducer