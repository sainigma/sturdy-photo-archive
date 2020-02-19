import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import CreatePhoto from './components/CreatePhoto'
import MassUpload from './components/MassUpload'
import UserDialogs from './components/UserDialogs'
import {initializePhotos,getOwnedPhotos} from './reducers/photoReducer'
import {getAllLocations,initializeLocations} from './reducers/locationReducer'

const PreviewLocation = (props) => {
  const photosToShow = props.photos.filter( photo => {
    return photo.location === props.location.id
  })
  return(
    <div>
      <h3>{props.location.name}</h3>
      {photosToShow.map( photo =>
        <img className='imgpreview' src={ 'http://localhost:3001/photos/'+photo.id + 'thumb.' + photo.filetype }/>
      )}
    </div>
  )
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
    if(!props.visibility)return(<></>)
    const locations = [...props.locations.locations,{id:null,name:'Unlabeled'}]
    return(
      <div className="mainscreen">
        {locations.map( location => <PreviewLocation location={location} photos={props.photos.owned}/> )}
      </div>
    )
  }

  if( !userInit && loggedIn ){
    props.getOwnedPhotos(props.user)
    props.getAllLocations(props.user)
    setUserInit(true)
  }

  return(
      <div className="container">
        <div className="loadingscreen"><img className="loadingwheel" src='http://localhost:3001/ajax.gif'/></div>
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
  }
}

export default connect(mapStateToProps,{initializePhotos,getOwnedPhotos,getAllLocations,initializeLocations})(App)