import loginService from './../services/login'
import photoService from './../services/photos'
import locationService from '../services/locations'

const initialState = {
  name: '',
  username: '',
  token: '',
  status: "0",
}

const userReducer = (state = initialState, action) => {

  if(action.type==='failedLogin'){
    return{
      status:action.status
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
  }else if(action.type==='initializeUser'){
    return{
      name:'',
      username: action.user.username,
      token: action.user.token,
      status: "200"
    }
  }
  return state
}

const spawnUser = async(login) => {
  let user = false
  if( login ){
    const response = await loginService.login(login.username,login.password)
    if( !response ) return false
    user = {
      name:'',
      username:login.username,
      token:'bearer $'+response.data.token,
      status:`${response.status}`
    }
    if( response.status !== 200 ) return{
      loggedIn: false,
      status: response.status
    }
  }else{
    let savedUser = window.localStorage.getItem('credentials')
    if( savedUser ){
      savedUser = JSON.parse(savedUser)
      const response = await loginService.test(savedUser)
      user = response.status === 200 ? savedUser : false
    }
  }
  if( user ){
    const photoQuery = await photoService.getOwned(user)
    const locationQuery = await locationService.getAll(user)
    return {
      loggedIn: true,
      photos: photoQuery ? photoQuery.data.photos : [],
      locations: locationQuery ? locationQuery.data.locations :[],
      user
    }
  }else{
    const photoQuery = await photoService.getPublic()
    return{
      loggedIn: false,
      photos: photoQuery ? photoQuery.data.photos : [],
      locations: photoQuery ? photoQuery.data.locations : [],
      user:{}
    }
  }
  return false
}

export const initializeUser = () => {
  return async dispatch => {
    const spawnedUser = await spawnUser()
    if( spawnedUser ){
      dispatch({
        type: spawnedUser.loggedIn ? 'initializeUser' : 'initializePublic',
        owned: spawnedUser.loggedIn ? spawnedUser.photos : {},
        photos: !spawnedUser.loggedIn ? spawnedUser.photos : {},
        locations: spawnedUser.locations,
        user: spawnedUser.user
      })
    }
    dispatch({
      type:'ERROR'
    })
  }
}

export const login = (username,password) => {
  return async dispatch => {
    const spawnedUser = await spawnUser({username,password})
    if( spawnedUser && spawnedUser.loggedIn ){
      window.localStorage.setItem('credentials', JSON.stringify(spawnedUser.user))
      dispatch({
        type: 'initializeUser',
        owned: spawnedUser.photos,
        photos: {},
        locations: spawnedUser.locations,
        user: spawnedUser.user
      })
    }else{
      dispatch({
        type: 'failedLogin',
        status: spawnedUser.status
      })
    }
  }
}

export const newUser = (username,password,email) => {
  return async dispatch => {
    try{
      const response = await loginService.newUser(username,password,email)
      if( response && response.status === 200 ){
        dispatch({
          type: 'NEWUSER',
          content: response,
          username: username,
          status: 200
        })
      }
    }catch(error){
      dispatch({
        type: 'NEWUSER',
        content:{status:400},
        username:null,
        status: 400
      })
    }
  }
}

export const reset = () => {
  return{
    type: 'RESET'
  }
}

export default userReducer