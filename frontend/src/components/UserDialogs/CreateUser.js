import React, {useState} from 'react'
import { connect } from 'react-redux'
import { newUser } from './../../reducers/userReducer'

const CreateUser = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if( props.visibility === false ){
    return(<></>)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    await props.newUser(username,password,email)
  }

  const handleChange = (event) => {
    if(event.target.id==='password'){
      setPassword(event.target.value)
    }else if(event.target.id==='username') setUsername(event.target.value)
    else setEmail(event.target.value)
  }

  if(props.user.username!==''&&props.user.token==='')return(
    <>
    <h2>A verification has been sent to your e-mail.</h2>
    </>
  )
  else return(
    <div>
    <form onSubmit={handleLogin}>
        Email: <input onChange={handleChange} id='email' value={email}/> <br/>
        Username: <input onChange={handleChange} id='username' value={username}/> <br/>
        Password: <input onChange={handleChange} type='password' id='password' value={password}/>
        <button type='submit'>Create new</button>
    </form>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,{newUser})(CreateUser)