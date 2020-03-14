import React from 'react'
const rootURI = 'http://localhost:3001'
const LoadingScreen = (props) => {
  const visibility = props.visibility ? 'block' : 'none'
  return(
    <div className="loadingscreen" style={{display:visibility }} ><img className="loadingwheel" src={`${rootURI}/ajax.gif`}/></div>
  )
}

export default LoadingScreen