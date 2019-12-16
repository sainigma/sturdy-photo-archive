import loginService from './../services/login'

const initialState = {
  name: '',
  username: '',
  token: '',
}

const userReducer = (state = initialState, action) => {
  if(action.type==='LOGIN'){
    console.log(action.content)
    if(action.content.status===200){
      return {
        name: '',
        username: action.username,
        token: 'bearer '+action.content.data.token,
      }
    }
  }else if(action.type==='NEWUSER'){
    console.log(action.content)
    if(action.content.status===200){
      return {
        name: '',
        username: action.username,
        token: '',
      }
    }
  }
  return state
}

export const login = (username,password) => {
  return async dispatch => {
    const response = await loginService.login(username,password)
    dispatch({
      type: 'LOGIN',
      content: response,
      username: username,
    })
  }
}

export const newUser = (username,password,email) => {
  return async dispatch => {
    const response = await loginService.newUser(username,password,email)
    dispatch({
      type: 'NEWUSER',
      content: response,
      username: username,
    })
  }
}

export default userReducer