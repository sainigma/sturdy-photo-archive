import React from 'react'

const Icon = (props) => {
  if( props.icon === 'null' ){
    return(<></>)
  }
  else{
    let size
    switch( props.size ){
      case 'insane':
        size = 2
        break
      case 'huge':
        size = 1.5
        break
      case 'large':
        size = 1.25
        break
      case 'small':
        size = 0.75
        break
      case 'tiny':
        size = 0.5
        break
      case 'normal':
      default:
        size = 1
        break
    }

    return(
      <div style={{
        minWidth: `${size}em`,
        minHeight: `${size}em`,
        padding:`${10*size}px`,
        display:'inlineBlock',
        backgroundImage:`url(./icons/${props.icon}.png)`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        filter:`invert(${ props.invert ? 0 : 1 })`,
        opacity:0.7
      }}/>
    )
  }
}

export default Icon