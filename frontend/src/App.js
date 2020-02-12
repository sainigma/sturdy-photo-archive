import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import CreatePhoto from './components/CreatePhoto'
import UserDialogs from './components/UserDialogs'

const App = (props) => {
  const [loggedIn,setLoggedIn] = useState(false)

  useEffect( ()=>{
    //console.log("start")
  },[])

  return(
      <div className="container">
        <UserDialogs visibility={!loggedIn} setLoggedIn={setLoggedIn}/>
        {loggedIn ? <CreatePhoto/> : <></>}
      </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    loggedIn:state.appstate.loggedIn,
    appstate:state.appstate
  }
}

export default connect(mapStateToProps,null)(App)