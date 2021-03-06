import React, {useEffect} from 'react'
import Comments from './general/Comments'
import Labels from './ImageEditor/Labels'
import Closer from './general/Closer'
import { connect } from 'react-redux'
import {changeView} from './../reducers/appStateReducer'
import {newLabel,updateSelected,updatePermissions,toggleLike} from './../reducers/photoReducer'
import Location from './ImageEditor/Location'
import Info from './ImageEditor/Info'
import PanoramaView from './ImageEditor/PanoramaView'
import Permissions from './ImageEditor/Permissions'
import Like from './ImageEditor/Like'
const rootURI = 'http://localhost:3001'

const LeftContainer = (props) => {
  if( props.selected && !props.selected.panorama ){
    return(
      <div className="imgeditorleftcontainer">
        <img className="uploadpreviewImg" src={props.fileurl}/>
        <div className="uploadpreviewBackground" style={{backgroundImage: `url(${props.fileurl})`}}/>
      </div>
    )
  }else if( props.selected !== undefined ){
    return(
      <PanoramaView photo={props.selected} scaleX={0.5}/>
    )
  }else{
    return(<></>)
  }
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
  const url = `${rootURI}/photos/`
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

  let hasEditRights = false
  if( props.selected !== undefined && ( props.selected.owner === props.activeUser || props.selected.uploader === props.activeUser ) ) hasEditRights = true
  console.log( props.selected )
  const fileurl = `${url}${id}.${filetype}`
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goBack} previous={true}/>
      <Closer onClick={goHome}/>
      <div className="imgeditorcontainer">
        <LeftContainer selected={props.selected} fileurl={fileurl}/>
        <RightContainer>
          { hideRightContainer ? <></> :
          <>
            <Info
              id={props.selected.id}
              name={props.selected.name}
              daterange={props.selected.daterange}
              owner={props.selected.owner}
              uploader={props.selected.uploader}
              hasEditRights={hasEditRights}
              description={props.selected.description}
            />
            <Location photoId={props.selected.id} location={props.selected.location} locations={props.locations} hasEditRights={hasEditRights}/>
            
            <Labels id={props.selected.id} newLabel={props.newLabel} labels={props.selected.labels} hasEditRights={hasEditRights}/>
            <Permissions hasEditRights={hasEditRights} permissions={props.selected.permissions} updatePermissions={props.updatePermissions}/>
            <Comments collapsed={true} id={props.selected.id} comments={props.selected.comments}/>
            <Like id={props.selected.id} changeLikes={props.toggleLike} likes={props.selected.likes} hasliked={props.selected.hasliked}/>
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
    previous:state.appstate.previous,
    locations:state.locations.locations,
    activeUser:state.user.username,
  }
}
export default connect(mapStateToProps,{changeView,newLabel,updateSelected,updatePermissions,toggleLike})(ImageEditor)