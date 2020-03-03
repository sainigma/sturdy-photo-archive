import React from 'react'
import ThumbnailButton from './../general/ThumbnailButton'


const PreviewLocation = (props) => {

  const filterPhotos = (photos,location) => {
    if( location.id === 'searchresult' ) return photos
    return photos.filter( photo => { return photo.location === location.id } )
  }


  const photosToShow = filterPhotos(props.photos,props.location)
  /*
  const photosToShow = props.photos.filter( photo => {
    return photo.location === props.location.id
  })
*/
  if( photosToShow.length >0 )return(
    <>
    <h4 className="locationLabel">{props.location.name}</h4>
    <div className="horizontalScrollerContainer scroller">
      <div className="horizontalScroller">
        {photosToShow.map( photo =>
          <ThumbnailButton 
            photo={photo}
            key={photo.id}
            thumbnailOnClick={props.thumbnailOnClick}
            appendix={props.appendix}
          />
        )}
      </div>
    </div></>
  )
  return (<></>)
}
export default PreviewLocation