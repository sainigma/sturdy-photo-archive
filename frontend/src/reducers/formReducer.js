const initialState = {
  createPhoto:{
    name:'',
    location:{
      name:'',
      address:'',
      postalcode:'',
      city:'',
      latitude:'',
      longitude:'',
      id:''
    }
  }
}

const formReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
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