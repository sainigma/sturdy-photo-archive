import locationService from '../services/locations'

const exampleState = {
  locations:[
    {
      id:'null',
      name:'null',
      permissions: {
        parent:-1,
        spouse:-1,
        child:-1,
        tangential:-1,
        friend:1,
      }
    }
  ]
}

const initialState = {
  locations:[]
}

const locationReducer = (state=initialState, action) => {
  if( action.type === 'LOCATIONGET' ){
    return {
      locations: action.locations
    }
  }
  if( action.type === 'initializeLocations'){
    return {
      locations: []
    }
  }
  return state
}

export const initializeLocations = () => {
  return{
    type:'initializeLocations'
  }
}

export const getAllLocations = (user) => {
  return async dispatch =>{
    const response = await locationService.getAll(user)
    if( response ){
      dispatch({
        type:'LOCATIONGET',
        locations: response.data.locations
      })
    }else{
      dispatch({
        type:'ERROR'
      })
    }

  }
}

export default locationReducer