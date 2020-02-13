import loginService from './../services/login'

const initialState = {
  name: '',
  username: '',
  token: '',
  status: "0",
}

const userReducer = (state = initialState, action) => {
  if(action.type==='LOGIN'){
    if(action.content.status===200){
      return {
        name: '',
        username: action.username,
        token: 'bearer $'+action.content.data.token,
        status: "200",
      }
    }else if(action.content.status===403){
      return {
        status: "403",
      }
    }else if(action.content.status===401){
      return {
        status: "401",
      }
    }
  }else if(action.type==='NEWUSER'){
    if(action.content.status===200){
      return {
        name: '',
        username: action.username,
        token: '',
        status: "200",
      }
    }
  }else if(action.type==='RESET'){
    return initialState
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

export const reset = () => {
  return{
    type: 'RESET'
  }
}

export default userReducer