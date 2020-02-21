import React from 'react'

const Notify = (props) => {
  if(!props.message)return(<></>)
  const border = props.message.success ? '1px solid green' : '1px solid red'
  return(
    <div className="notify" style={{border}}>{props.message.content}</div>
  )
}

export default Notify