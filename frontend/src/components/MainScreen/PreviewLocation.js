import React from 'react'
import { connect } from 'react-redux'
import ThumbnailButton from './../general/ThumbnailButton'
import {changeLocationAndDiv} from './../../reducers/photoReducer'

const PreviewLocation = (props) => {
  const filterPhotos = (photos,location) => {
    if( location.id === 'searchresult' ) return photos
    return photos.filter( photo => { return (photo.location === location.id && (photo.visible === undefined || photo.visible === true) ) } )
  }

  const onDrop = (event) => {
    event.preventDefault()
    if( !props.notDraggable ){
      const newpreview = event.dataTransfer.getData("imagepreviewtransfer")
      if( event.target.className === 'horizontalScroller' ){
        props.changeLocationAndDiv(event.target, newpreview, props.location)
      }else if( event.target.parentElement.className === 'horizontalScroller'){
        props.changeLocationAndDiv(event.target.parentElement, newpreview, props.location)
      }else if( event.target.parentElement.parentElement.className === 'horizontalScroller' ){
        props.changeLocationAndDiv(event.target.parentElement.parentElement, newpreview, props.location)
      }
    }
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDragLeave = (event) => {
    event.preventDefault()
  }
  const photos = props.photos.owned.length > 0 ? props.photos.owned : props.photos.public
  const photosToShow = filterPhotos(photos,props.location)

  if( photosToShow.length >0 )return(
    <>
    <h4 className="locationLabel">{props.location.name}</h4>
    <div className="horizontalScrollerContainer scroller">
      <div className="horizontalScroller"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      >
        {photosToShow.map( photo =>
          <ThumbnailButton 
            photo={photo}
            key={photo.id}
            thumbnailOnClick={props.thumbnailOnClick}
            appendix={props.appendix}
            notDraggable={props.notDraggable}
          />
        )}
      </div>
    </div></>
  )
  return (<></>)
}

const mapStateToProps = (state) => {
  return{
    photos:state.photos
  }
}
export default connect(mapStateToProps,{changeLocationAndDiv})(PreviewLocation)