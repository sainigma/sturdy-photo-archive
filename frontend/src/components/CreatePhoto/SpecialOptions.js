import React, {useState} from 'react'
import Input from './../general/Input'
import {Save} from './../general/ToggleSubmenu'

const SpecialOptions = (props) =>{

  if(!props.visibility)return(<></>)

  return(
    <>
      <Input type="text" value="panorama"/>
      <Input type="text" value="equirectangular"/>
      <Input type="text" value="azimuth"/>
      <Input type="text" value="altitude"/>
      <h3>Offsets</h3>
      <Input type="text" value="height"/>
      <Input type="text" value="lateral"/>
      <Input type="text" value="longitudal"/>
      <Save visibility={true} toggleVisibility={props.toggleVisibility}/>
    </>
  )
}

export default SpecialOptions