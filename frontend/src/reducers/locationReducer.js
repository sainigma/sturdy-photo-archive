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
      },
      visible:true
    }
  ]
}

const initialState = {
  locations:[]
}

const locationReducer = (state=initialState, action) => {
  let newState
  switch( action.type ){
    case 'LOCATIONGET':
    case 'initializePublic':
    case 'initializeUser':
      return {
        locations: action.locations
      }

    case 'updateLocation':
      newState = JSON.parse(JSON.stringify(state))
      const locationExists = newState.locations.find( location => location.id === action.location.id )
      if( locationExists === undefined ){
        newState.locations = [
          ...newState.locations,
          action.location
        ]
      }
      return newState
    case 'toggleLocation':
      newState = JSON.parse(JSON.stringify(state))
      newState.locations = newState.locations.map( location => {
        let tempLoc
        if( action.id.includes('all') ){
          tempLoc = JSON.parse(JSON.stringify(location))
          if( action.id === 'allOff' ){
            tempLoc.visible = false
          } else {
            console.log('moi')
            tempLoc.visible = true
          }
          return tempLoc
        }else if( location.id === action.id ){
          tempLoc = JSON.parse(JSON.stringify(location))
          tempLoc.visible = tempLoc.visible === undefined || tempLoc.visible ? false : true
          return tempLoc
        }else return location
      })
      return newState
    default:
      break
  }
  return state
  
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

export const toggleLocationVisibility = (id) => {
  return{
    type:'toggleLocation',
    id
  }
  
}

export default locationReducer