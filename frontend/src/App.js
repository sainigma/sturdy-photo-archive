import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import UserDialogs from './components/UserDialogs'
import LoadingScreen from './components/LoadingScreen'
import MainScreen from './components/MainScreen'
import ImageEditor from './components/ImageEditor'
import ImageViewer from './components/ImageViewer'
import FilmStrip from './components/FilmStrip'
import HamburgerMenu from './components/HamburgerMenu'
import {initializeUser} from './reducers/userReducer'
import {getOwnedPhotos} from './reducers/photoReducer'
import {getAllLocations} from './reducers/locationReducer'
import Upload from './components/Uploads'


const App = (props) => {
  const [loggedIn,setLoggedIn] = useState(false)
  const [userInit, setUserInit] = useState(false)

  useEffect( ()=>{
    props.initializeUser()
  },[])

  if( !userInit && loggedIn ){
    props.getOwnedPhotos(props.user)
    props.getAllLocations(props.user)
    setUserInit(true)
  }

  return(
    <>
      <div className="container scroller">
        <LoadingScreen visibility={props.notify.loading} messages={props.notify.messages}/>
        <ImageViewer visibility={props.appstate.currentView.includes("imageViewer")} photo={props.appstate.options.photo} />
        <FilmStrip visibility={props.appstate.currentView.includes('filmstrip')} />
        <ImageEditor visibility={props.appstate.currentView.includes("imageEditor")} photo={props.appstate.options.photo} />
        <div className="container scroller">
          <MainScreen visibility={props.loggedIn} photos={props.photos} locations={props.locations}/>
          <UserDialogs visibility={!props.loggedIn} setLoggedIn={setLoggedIn}/>
          <HamburgerMenu/>
          <Upload loggedIn={props.loggedIn}/>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    loggedIn:state.appstate.loggedIn,
    appstate:state.appstate,
    locations:state.locations,
    photos:state.photos,
    notify:state.notify
  }
}

export default connect(mapStateToProps,{initializeUser,getOwnedPhotos,getAllLocations})(App)