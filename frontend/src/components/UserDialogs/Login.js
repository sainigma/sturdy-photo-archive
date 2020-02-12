import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import Input from '../general/Input' 
import { varExists } from '../../utils/utils'

const Message = (props) => {
  let message = ''
  if( props.status === "403" ) message = "Account unverified, [click here] to resend verification e-mail"
  else if( props.status === "401") message = "Invalid credentials"
  if( message !== '' ){
    return(
      <h3>{message}</h3>
    )
  }else return(<></>)
}

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if( props.visibility === false )return(<></>)

  const handleLogin = async(event) => {
    event.preventDefault()
    props.login(username,password)
  }

  const handleChange = (event) => {
    if(event.target.name==='password'){
      setPassword(event.target.value)
    }else setUsername(event.target.value)
  }

  if( props.status === "200" ){
    if( varExists( props.user.username ) && varExists( props.user.token ) ){
      props.setLoggedIn(true)
    }
  }

  return(
    <div className="loginContainer">
      <form onSubmit={handleLogin}>
          <Input type={"text"} icon={"user"} label={"username"} name={"username"} onChange={handleChange}/>
          <Input type={"password"} icon={"key"} label={"password"} name={"password"} onChange={handleChange}/>
          <Input type={"submit"} icon={"null"} label={" "} value={"Login"}/>
          <Message status={props.status}/>
      </form>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    status:state.user.status
  }
}

export default connect(mapStateToProps,{login})(Login)