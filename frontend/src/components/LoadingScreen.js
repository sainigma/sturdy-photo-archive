import React from 'react'

const LoadingScreen = (props) => {
  const visibility = props.visibility ? 'block' : 'none'
  return(
    <div className="loadingscreen" style={{display:visibility }} ><img className="loadingwheel" src='http://localhost:3001/ajax.gif'/></div>
  )
}

export default LoadingScreen