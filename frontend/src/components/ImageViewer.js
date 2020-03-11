import React, {useState} from 'react'
import Closer from './general/Closer'
import { connect } from 'react-redux'
import {changeView} from './../reducers/appStateReducer'
import PanoramaView from './ImageEditor/PanoramaView'

const ImageViewer = (props) => {
  const [zoomed, setZoomed] = useState(false)
  if( !props.visibility )return(<></>)
  
  const goHome = (event) => {
    setZoomed(false)
    props.changeView('home',{})
  }

  const toggleZoom = (event) => {
    console.log(`${event.clientX} ${event.clientY}`)
    setZoomed(!zoomed)
  }

  const id = props.photo.id
  const filetype = props.photo.filetype
  const url = 'http://localhost:3001/photos/'
  const fileurl = `${url}${id}.${filetype}`

  if( props.photo.panorama ){
    return (
      <div className="imgeditorbackground">
        <Closer onClick={goHome}/>
        <PanoramaView photo={props.photo} large={true}/>
      </div>
    )
  }
  else {
    return (
    <div className="imgeditorbackground">
      <Closer onClick={goHome}/>
      <div className="container scroller">
      <div className="imgviewercontainer">
        <img
          className={ zoomed ? "imgeditorimgzoomed" : "imgeditorimg" }
          src={fileurl}
          onClick={toggleZoom}
        />
      </div>
      </div>
    </div>
  )}
}

export default connect(null,{changeView})(ImageViewer)