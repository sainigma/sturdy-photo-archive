import React from 'react'
import IconButton from './IconButton'

const Closer = (props) => {
  const style = props.previous ? { left:'1em' } : { right: '1em' }
  const icon = props.previous ? 'back' : 'close'
  return(
    <div className="closebutton" style={style}>
      <IconButton visibility="block" onClick={props.onClick} icon={icon}/>
    </div>
  )
}
export default Closer