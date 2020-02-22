import React from 'react'

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
          <img key={photo.id} className='imgpreview' src={ 'http://localhost:3001/photos/'+photo.id + 'thumb.' + photo.filetype }/>
        )}
      </div>
    </div></>
  )
  return (<></>)
}
export default PreviewLocation