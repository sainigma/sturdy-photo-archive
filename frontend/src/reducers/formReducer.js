const initialState = {
  createPhoto:{
    name:'',
    location:{
      name:'',
      latitude:'',
      longitude:'',
      id:''
    }
  }
}

const formReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'location' ){
    if( action.subtype === 'name' ){
      newState.createPhoto.location.name = action.data
      return newState
    }else if( action.subtype === 'latitude' ){
      newState.createPhoto.location.latitude = action.data
      return newState
    }else if( action.subtype === 'longitude' ){
      newState.createPhoto.location.longitude = action.data
      return newState
    }else if( action.subtype === 'id'){
      newState.createPhoto.location.id = action.data
      return newState
    }
  }

  return state
}

export const setLocation = (data, subtype) => {
  if( subtype !== 'id'){
    return{
      type: 'location',
      subtype,
      data
    }
  }else{
    //hae nimi, sitten dispatch
    return{
      type: 'location',
      subtype,
      data
    }
  }

}

export default formReducer