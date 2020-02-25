import React, { useState } from 'react'

const PreviewButton = (props) => {
  const className = props.left ? "previewleftbutton" : "previewrightbutton"
  const backgroundImage = `url(./icons/${props.type}.png)`

  return (
    <div
      className={className}
      onClick={props.onClick}
      style={{
        display: props.visibility,
        backgroundImage: backgroundImage
      }}
    />
  )
}

const ThumbnailButton = (props) => {
  const [visibility, setVisibility] = useState('none')
  const imgOver = () => { if (visibility === 'none') setVisibility('block') }
  const imgExit = () => { if (visibility === 'block') setVisibility('none') }

  const showDialog = () => {
    console.log("alert!")
  }

  return (
    <div className='divpreview' onMouseOver={imgOver} onMouseOut={imgExit}>
      <PreviewButton left={true} type="edit" visibility={visibility} onClick={showDialog} id={props.photo.id}/>
      <PreviewButton right={true} type="view" visibility={visibility} onClick={showDialog} id={props.photo.id}/>
      <img
        className='imgpreview'
        src={'http://localhost:3001/photos/' + props.photo.id + 'thumb.' + props.photo.filetype}
      />
    </div>
  )
}

export default ThumbnailButton