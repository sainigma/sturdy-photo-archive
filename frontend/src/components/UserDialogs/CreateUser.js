import React, {useState} from 'react'
import { connect } from 'react-redux'
import { newUser } from './../../reducers/userReducer'
import Input from '../general/Input'
import Notify from './../general/Notify'

const CreateUser = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(false)
  if( props.visibility === false ){
    if( active ) setActive(false)
    return(<></>)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    setActive(true)
    await props.newUser(username,password,email)
  }

  const handleChange = (event) => {
    if(event.target.name==='password'){
      setPassword(event.target.value)
    }else if(event.target.name==='username') setUsername(event.target.value)
    else setEmail(event.target.value)
  }

  if(props.user.username!==''&&props.user.token==='')return(
    <>
    <h3>Account created, contact administator for activation</h3>
    </>
  )
  else return(
    <div>
    <form onSubmit={handleLogin}>
        <Input type="text" icon="null" label="Email" name='email' onChange={handleChange}/>
        <Input type="text" icon="user" label="Username" name='username' onChange={handleChange}/>
        <Input type="password" icon="key" label="Password" name='password' onChange={handleChange}/>
        { active ? <Notify message={ props.messages.length>0 ? props.messages[0] : null} /> : <></> }
        <Input type="submit" icon="null"  value="Create new"/>
    </form>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    messages:state.notify.messages
  }
}

export default connect(mapStateToProps,{newUser})(CreateUser)