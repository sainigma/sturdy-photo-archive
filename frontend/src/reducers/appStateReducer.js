import photoService from '../services/photos'

const initialState = {
  currentView: 'home',
  options:{},
  loggedIn: false,
  showLogin: false,
  showCreateUser: false
}

const appStateReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'CHANGEVIEW' ){
    newState.currentView = action.newView
    newState.options = action.options
  }
  return newState
}

export const changeView = (newView, options) => {
  return async dispatch => {
    if( newView === 'imageEditor' ){
      const response = await photoService.fetchSingle(options.photo.id, options.user)
      if( response ){
        console.log( response.data.result[0] )
        dispatch({
          type: 'CHANGEVIEW',
          newView,
          options,
          response: response.data.result[0]
        })
      }
    }
    dispatch({
      type: 'CHANGEVIEW',
      newView,
      options
    })
  }
}

export default appStateReducer