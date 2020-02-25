import React from 'react'
import IconButton from './IconButton'

const Closer = (props) => {
  return(
    <div className="closebutton">
      <IconButton visibility="block" onClick={props.onClick} icon="close"/>
    </div>
  )
}
export default Closer