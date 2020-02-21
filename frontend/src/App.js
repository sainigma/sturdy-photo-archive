import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import CreatePhoto from './components/CreatePhoto'
import MassUpload from './components/MassUpload'
import UserDialogs from './components/UserDialogs'
import {initializePhotos,getOwnedPhotos} from './reducers/photoReducer'
import {getAllLocations} from './reducers/locationReducer'

const Notifications = (props) => {

  const visibility = props.visibility ? 'block' : 'none'

  return(
    <div className="loadingscreen" style={{display:visibility }} ><img className="loadingwheel" src='http://localhost:3001/ajax.gif'/></div>
  )
}
const PreviewLocation = (props) => {

  const photosToShow = props.photos.filter( photo => {
    return photo.location === props.location.id
  })

  if( photosToShow.length >0 )return(
    <>
    <h4 className="locationLabel">{props.location.name}</h4>
    <div className="horizontalScrollerContainer scroller">
      <div className="horizontalScroller">
        {photosToShow.map( photo =>
          <img key={photo.id} className='imgpreview' src={ 'http://localhost:3001/photos/'+photo.id + 'thumb.' + photo.filetype }/>
        )}
      </div>
    </div></>
  )
  return (<></>)
}

const App = (props) => {
  const [loggedIn,setLoggedIn] = useState(false)
  const [singleUpload, setSingleUpload] = useState(false)
  const [massUpload, setMassUpload] = useState(false)
  const [userInit, setUserInit] = useState(false)

  useEffect( ()=>{
    props.initializePhotos()
  },[])

  const MainScreen = (props) => {
    if(!props.photos.initialized)return(<></>)
    const locations = [...props.locations.locations,{id:null,name:'Unlabeled'}]
    return(
      <div className="mainscreen">
        <div className="mainscreenHeader"/>
        {locations.map( location => <PreviewLocation key={location.id} location={location} photos={ props.visibility ? props.photos.owned : props.photos.public }/> )}
      </div>
    )
  }

  if( !userInit && loggedIn ){
    props.getOwnedPhotos(props.user)
    props.getAllLocations(props.user)
    setUserInit(true)
  }

  return(
      <div className="container scroller">
        <Notifications visibility={props.notify.loading} messages={props.notify.messages}/>
        <MainScreen visibility={loggedIn} photos={props.photos} locations={props.locations}/>
        <div className="rightsidebar">
          <UserDialogs visibility={!loggedIn} setLoggedIn={setLoggedIn}/>
          <CreatePhoto visibility={loggedIn&&!massUpload} setSingleUpload={setSingleUpload}/>
          <MassUpload visibility={loggedIn&&!singleUpload} setMassUpload={setMassUpload}/>
        </div>
      </div>
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

export default connect(mapStateToProps,{initializePhotos,getOwnedPhotos,getAllLocations})(App)