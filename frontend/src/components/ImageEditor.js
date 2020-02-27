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

  console.log(props.selected)
  const goHome = (event) => {
    props.changeView('home',{})
  }
  const fileurl = `${url}${id}.${filetype}`
  console.log(props.selected)
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goHome}/>
      <div className="imgeditorcontainer">
        {JSON.stringify(props.selected)}
        <LeftContainer fileurl={fileurl}/>
        <RightContainer>
          <Info
            name={props.selected.name}
            daterange={props.selected.daterange}
            owner={props.selected.owner}
            uploader={props.selected.uploader}
          />
          <Location location={props.selected.location}/>
          <Labels album={true} labels={props.selected.albums}/>
          <Labels labels={props.selected.labels}/>
          <Comments collapsed={true} id={props.selected.id} comments={props.selected.comments}/>
        </RightContainer>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    selected:state.photos.selected,
  }
}
export default connect(mapStateToProps,{changeView})(ImageEditor)