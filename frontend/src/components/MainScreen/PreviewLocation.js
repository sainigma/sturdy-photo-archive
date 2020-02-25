import React from 'react'
import ThumbnailButton from './../general/ThumbnailButton'


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
          <ThumbnailButton photo={photo} key={photo.id}/>
        )}
      </div>
    </div></>
  )
  return (<></>)
}
export default PreviewLocation