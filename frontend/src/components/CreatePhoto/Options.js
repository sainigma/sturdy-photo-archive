import React, {useState} from 'react'
import Input from './../general/Input'
import LocationPicker from './LocationPicker'
import ToggleSubMenu, {Save} from './../general/ToggleSubmenu'
import SpecialOptions from './SpecialOptions'

const NameSelector = (props) => {
  if( !props.visibility ) return(<></>)
  return(
    <Input type="text" label="Name"/>
  )
}

const DatePicker = (props) => {
  if( !props.visibility ) return(<></>)
  return(
    <>
      <Input type="text" placeholder="Datepicker1"/>
    </>
  )
}

const Options = (props) => {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [locationPickerActive, setLocationPickerActive] = useState(false)

  if( !props.visibility ) return(<></>)
  return(
    <>
      <NameSelector visibility={ !(showSubmenu || locationPickerActive) }/>
      <LocationPicker visibility={!showSubmenu} setLocationPickerActive={setLocationPickerActive} setHasLocation={props.setHasLocation}/>
      <DatePicker visibility={ !(showSubmenu || locationPickerActive) }/>
      <ToggleSubMenu visibility={ !(showSubmenu || locationPickerActive) } value="Special" setSubmenuVisibility={setShowSubmenu} />
      <Save visibility={ !(showSubmenu || locationPickerActive) } toggleVisibility={props.toggleVisibility}/>
      <SpecialOptions visibility={showSubmenu} toggleVisibility={setShowSubmenu}/>
    </>
  )
}

export default Options