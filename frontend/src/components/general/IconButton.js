import React from 'react'

const IconButton = (props) => {
  const backgroundImage = `url(./icons/${props.icon}.png)`

  return(
    <div
      className={ props.className ? props.className : "iconbutton"}
      onClick={props.onClick}
      style={{
        display:props.visibility,
        backgroundImage:backgroundImage
      }}
      type={ props.type ? props.type : null }
    />
  )
}

export default IconButton