import React from 'react'
import Comments from './general/Comments'
import Labels from './ImageEditor/Labels'
import Closer from './general/Closer'
import { connect } from 'react-redux'
import {changeView} from './../reducers/appStateReducer'
import Location from './ImageEditor/Location'
import Info from './ImageEditor/Info'

const LeftContainer = (props) => {
  return(
    <div className="imgeditorleftcontainer">
      <img className="uploadpreviewImg" src={props.fileurl}/>
      <div className="uploadpreviewBackground" style={{backgroundImage: `url(${props.fileurl})`}}/>
    </div>
  )
}

const RightContainer = (props) => {
  return(
    <div className="imgeditorrightcontainer scroller">
      {props.children}
    </div>
  )
}



const ImageEditor = (props) => {
  if( !props.visibility )return(<></>)
  const id = props.photo.id
  const filetype = props.photo.filetype
  const url = 'http://localhost:3001/photos/'

  const goHome = (event) => {
    props.changeView('home',{})
  }
  const fileurl = `${url}${id}.${filetype}`
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goHome}/>
      <div className="imgeditorcontainer">
        <LeftContainer fileurl={fileurl}/>
        <RightContainer>
          <Info/>
          <Location/>
          <Labels/>
          <Comments collapsed={true}/>
        </RightContainer>
      </div>
    </div>
  )
}
export default connect(null,{changeView})(ImageEditor)