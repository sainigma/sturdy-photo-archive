import React, {useEffect} from 'react'
import Comments from './general/Comments'
import Labels from './ImageEditor/Labels'
import Closer from './general/Closer'
import { connect } from 'react-redux'
import {changeView} from './../reducers/appStateReducer'
import {newLabel,updateSelected} from './../reducers/photoReducer'
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

  useEffect( ()=>{
    props.updateSelected(props.photo.id)
  },[])

  const id = props.photo.id
  const filetype = props.photo.filetype
  const url = 'http://localhost:3001/photos/'
  const hideRightContainer = (
    props.selected === undefined || 
    props.selected.daterange === undefined || 
    props.selected.owner === undefined ||
    props.selected.uploader === undefined
  ) ? true : false


  const goBack = (event) => {
    if( props.previous.length === 1 ){
      props.changeView('home',{})
    }else props.changeView('previous',{})
  }

  const goHome = () => {
    props.changeView('home',{})
  }

  const fileurl = `${url}${id}.${filetype}`
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goBack} previous={true}/>
      <Closer onClick={goHome}/>
      <div className="imgeditorcontainer">
        <LeftContainer fileurl={fileurl}/>
        <RightContainer>
          { hideRightContainer ? <></> :
          <>
            <Info
              name={props.selected.name}
              daterange={props.selected.daterange}
              owner={props.selected.owner}
              uploader={props.selected.uploader}
            />
            <Location location={props.selected.location}/>
            
            <Labels id={props.selected.id} newLabel={props.newLabel} labels={props.selected.labels}/>
            <Comments collapsed={true} id={props.selected.id} comments={props.selected.comments}/>
          </>
          }
        </RightContainer>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    selected:state.photos.selected,
    previous:state.appstate.previous
  }
}
export default connect(mapStateToProps,{changeView,newLabel,updateSelected})(ImageEditor)
//<Labels collapsed={true} album={true} labels={props.selected.albums}/>