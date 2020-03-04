import React from 'react'
import { connect } from 'react-redux'
import ThumbnailButton from './../general/ThumbnailButton'
import {changeLocation} from './../../reducers/photoReducer'

const PreviewLocation = (props) => {
  const filterPhotos = (photos,location) => {
    if( location.id === 'searchresult' ) return photos
    return photos.filter( photo => { return photo.location === location.id } )
  }

  const onDrop = (event) => {
    event.preventDefault()
    if( !props.notDraggable ){
      const newpreview = event.dataTransfer.getData("imagepreviewtransfer")
      if( event.target.className === 'horizontalScroller' ){
        props.changeLocation(event.target, newpreview, props.location)
      }else if( event.target.parentElement.className === 'horizontalScroller'){
        props.changeLocation(event.target.parentElement, newpreview, props.location)
      }else if( event.target.parentElement.parentElement.className === 'horizontalScroller' ){
        props.changeLocation(event.target.parentElement.parentElement, newpreview, props.location)
      }
    }
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDragLeave = (event) => {
    event.preventDefault()
  }

  const photosToShow = filterPhotos(props.photos,props.location)

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
export default connect(null,{changeLocation})(PreviewLocation)