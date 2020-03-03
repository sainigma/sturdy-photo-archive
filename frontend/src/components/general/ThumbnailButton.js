import React, { useState } from 'react'
import { connect } from 'react-redux'
import {changeView} from './../../reducers/appStateReducer'
import IconButton from './IconButton'

const ThumbnailButton = (props) => {
  const [visibility, setVisibility] = useState('none')
  const imgOver = () => { if (visibility === 'none') setVisibility('block') }
  const imgExit = () => { if (visibility === 'block') setVisibility('none') }

  const showDialog = (event) => {
    const options = {
      photo:props.photo,
      user:props.user
    }
    props.changeView( event.target.attributes.type.value, options )
  }

  const specialStyle = props.thumbnailOnClick ? {cursor:'pointer'} : {}
  const previousView = props.appendix ? props.appendix : ''

  return (
    <div className='divpreview' onMouseOver={imgOver} onMouseOut={imgExit}>
      <IconButton type={`imageEditor${previousView}`} icon="edit" className="previewleftbutton" visibility={props.user.token!==''?visibility:'none'} onClick={showDialog}/>
      <IconButton type={`imageViewer`} icon="view" className="previewrightbutton" visibility={visibility} onClick={props.thumbnailOnClick ? props.thumbnailOnClick : showDialog}/>
      <img
        className='imgpreview'
        src={'http://localhost:3001/photos/' + props.photo.id + 'thumb.' + props.photo.filetype}
        style={specialStyle}
        onClick={props.thumbnailOnClick ? props.thumbnailOnClick : null}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,{changeView})(ThumbnailButton)