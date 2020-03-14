import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import Input from '../general/Input' 
import { varExists } from '../../utils/utils'
import Notify from './../general/Notify'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(false)
  if( props.visibility === false ){
    if( active ) setActive(false)
    return(<></>)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    setActive(true)
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
          { active ? <Notify message={ props.messages.length>0 ? props.messages[0] : null} /> : <></> }
          <Input type={"submit"} icon={"null"} value={"Login"}/>
      </form>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    status:state.user.status,
    messages:state.notify.messages
  }
}

export default connect(mapStateToProps,{login})(Login)