
import React, {useState} from 'react'
import Input from './Input'

export const Save = (props) => {
  if( !props.visibility ) return(<></>)
  const returnToMain = () => {
    props.toggleVisibility(false)
  }
  return(
    <Input type="button" icon="save" value="Save" onClick={returnToMain}/>
  )
}

const ToggleSubMenu = (props) => {
  const toggleOff = () => {
    props.setSubmenuVisibility( true )
  }
  if(!props.visibility)return(<></>)
  return(
    <Input type={"button"} icon={"options"} value={props.value} onClick={toggleOff}/>
  )
}

export default ToggleSubMenu