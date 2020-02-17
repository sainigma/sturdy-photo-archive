const initialState = {
  currentView: 'home',
  loggedIn: false,
  showLogin: false,
  showCreateUser: false,
}

const appStateReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'CHANGEVIEW '){
    newState.currentView = action.newView
  }else if( action.type === 'TOGGLELOGIN' ){
    newState.loggedIn = !newState.loggedIn
  }else if( action.type === 'TOGGLECREATEUSER' ){
    newState.showCreateUser = !newState.showCreateUser
  }else if( action.type === 'SETLOGINANDCREATE' ){
    newState.loggedIn = action.login
    newState.showLogin = action.login
    newState.showCreateUser = action.create
  }
  return newState
}

export const changeView = (newView) => {
  return{
    type:'CHANGEVIEW',
    newView,
  }
}

export const toggleLogin = () => {
  return{
    type:'TOGGLELOGIN',
  }
}

export const toggleCreateUser = () => {
  return{
    type:'TOGGLECREATEUSER'
  }
}

export const setLoginAndCreate = (login,create) => {
  return{
    type:'SETLOGINANDCREATE',
    login,
    create,
  }
}

export default appStateReducer