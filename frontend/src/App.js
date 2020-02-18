import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import CreatePhoto from './components/CreatePhoto'
import CreatePhotos from './components/CreatePhotos'
import UserDialogs from './components/UserDialogs'

const App = (props) => {
  const [loggedIn,setLoggedIn] = useState(false)
  const [singleUpload, setSingleUpload] = useState(false)
  const [massUpload, setMassUpload] = useState(false)


  useEffect( ()=>{
    //console.log("start")
  },[])

  const MainScreen = (props) => {
    return(
      <div className="mainscreen"></div>
    )
  }

  return(
      <div className="container">
        <MainScreen/>
        <div className="rightsidebar">
       
          <UserDialogs visibility={!loggedIn} setLoggedIn={setLoggedIn}/>
          <CreatePhoto visibility={loggedIn&&!massUpload} setSingleUpload={setSingleUpload}/>
          <CreatePhotos visibility={loggedIn&&!singleUpload} setMassUpload={setMassUpload}/>
        </div>

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