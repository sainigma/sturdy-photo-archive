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
    dispatch({
      type: 'CHANGEVIEW',
      newView,
      options
    })
  }
}

export default appStateReducer