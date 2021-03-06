import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Login from './UserDialogs/Login'
import CreateUser from './UserDialogs/CreateUser'
import Input from './general/Input'
import { reset } from './../reducers/userReducer'
import IconButton from './general/IconButton'

const ShowLoginControls = (props) => {

  const handleClick = (event) => {
    if( event.target.name === 'login' ){
      props.reset()
      props.setShowLogin(true)
    }else if( event.target.name === 'createuser' ){
      props.reset()
      props.setShowCreateUser(true)
    }else if( event.target.name === 'cancel' ){
      props.setShowLogin(false)
      props.setShowCreateUser(false)
    }
  }

  if( props.visibility === false ){
    return(
      <Input name={"cancel"} type={"button"} icon={"null"} value={"Close"} onClick={handleClick}/>
    )
  }
  return(
    <>
      <div style={{width:"49.8%", float:"left"}}><Input name={"login"} type={"button"} icon={"null"} value={"Login"} onClick={handleClick}/></div>
      <div style={{width:"49.8%", float:"right"}}><Input name={"createuser"} type={"button"} icon={"null"} value={"Create user"} onClick={handleClick}/></div>
    </>
  )
}

const UserDialogs = (props) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [active, setActive] = useState(false)

  if( props.visibility === false ) return (<></>)

  const toggleActive = () => {
    setActive(!active)
  }

  if( !active ) return (
    <div className="mainactioniconright">
      <IconButton icon='keybutton' onClick={toggleActive}/>
    </div>
  )

  return(
    <div className="rightsidebar">
      <Login visibility={showLogin} setLoggedIn={props.setLoggedIn} />
      <CreateUser visibility={showCreateUser}/>
      <ShowLoginControls 
        visibility={ !( showLogin || showCreateUser )  }
        setShowLogin={setShowLogin}
        setShowCreateUser={setShowCreateUser}
        reset={props.reset}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    appstate:state.appstate
  }
}

export default connect(mapStateToProps,{reset})(UserDialogs)