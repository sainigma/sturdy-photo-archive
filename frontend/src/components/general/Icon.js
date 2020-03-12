import React from 'react'
import { InvertStencilOp } from 'three'

const getIcon = (icon) => {
  let iconClass = 'null'
  switch (icon){
    case 'map':
      iconClass = 'map-marker'
      break
    case 'user':
      iconClass = 'user'
      break
    case 'users':
      iconClass = 'users'
      break
    case 'label':
      iconClass = 'tag'
      break
    case 'labels':
      iconClass = 'tags'
      break
    case 'albums':
      iconClass = 'images'
      break
    case 'file':
      iconClass = 'file-image-o'
      break
    case 'save':
      iconClass = 'save'
      break
    case 'address':
      iconClass = 'mail-bulk'
      break
    case 'key':
      iconClass = 'key'
      break
    case 'rulerVertical':
      iconClass = 'arrows-alt'
      break
    case 'calendar':
      iconClass = 'calendar'
      break
    case 'empty':
      iconClass = 'empty'
      break
    case 'options':
      iconClass = 'cog'
      break
    case 'null':
      iconClass = 'null'
      break
    default:
      iconClass = 'user'
  }
  iconClass = "fa fa-"+iconClass+" icon"
  return iconClass
} 

const Icon = (props) => {
  if( props.icon === 'null' ){
    return(<></>)
  }
  else{
    //const iconClass = getIcon(props.icon)
    console.log(props.icon)
    return(
      <div style={{
        minWidth:'2em',
        padding:'0.5em',
        display:'inlineBlock',
        backgroundImage:`url(./icons/${props.icon}.png)`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        filter:`invert(${ props.invert ? 0 : 1 })`,
        opacity:0.7
      }}/>
    )
    return(
      <i className={iconClass}/>
    )
  }
}

export default Icon