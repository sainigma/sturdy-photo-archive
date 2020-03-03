import photoService from '../services/photos'

const initialState = {
  currentView: 'home',
  options:{},
  loggedIn: false,
  showLogin: false,
  showCreateUser: false,
  previous:[]
}

const appStateReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'CHANGEVIEW' ){
    if( action.newView === 'previous' ){
      let previous = newState.previous.pop()
      if( previous.currentView === newState.currentView ){
        previous = newState.previous.pop()
      }
      if( previous !== undefined ){
        newState.currentView = previous.currentView
        newState.options = previous.options
      }
    }else{
      const previousName = newState.previous.length ? newState.previous[ newState.previous.length -1 ].currentView : undefined
      if( previousName === undefined || previousName !== newState.currentView ){
        newState.previous.push({
          currentView: newState.currentView,
          options: newState.options
        })
      }
      newState.currentView = action.newView
      newState.options = action.options
    }
    if( newState.currentView === undefined ){
      newState.currentView = 'home'
      newState.options = {}
    }
  }else if( action.type === 'initializeUser' ){
    newState.loggedIn = true
  }
  return newState
}

export const changeView = (newView, options) => {
  return {
    type: 'CHANGEVIEW',
    newView,
    options
  }
}

export default appStateReducer