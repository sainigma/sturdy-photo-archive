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
  return state
}

export const getAll = (user) => {
  return async dispatch =>{
    const response = await locationService.getAll(user)
    console.log(response)
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