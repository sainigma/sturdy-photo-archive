import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login } from './../reducers/userReducer'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    await props.login(username,password)
  }

  const handleChange = (event) => {
    if(event.target.id==='password'){
      setPassword(event.target.value)
    }else setUsername(event.target.value)
  }

  return(
    <>
    <form onSubmit={handleLogin}>
        Username: <input onChange={handleChange} id='username' value={username}/> <br/>
        Password: <input onChange={handleChange} type='password' id='password' value={password}/>
        <button type='submit'>login</button>
    </form>
    </>
    
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,{login})(Login)