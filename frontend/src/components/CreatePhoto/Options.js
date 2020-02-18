import React, {useState} from 'react'
import { setOptions } from './../../reducers/formReducer'
import { connect } from 'react-redux'
import Input from './../general/Input'
import LocationPicker from './LocationPicker'
import ToggleSubMenu, {Save} from './../general/ToggleSubmenu'
import SpecialOptions from './SpecialOptions'
import dateFormatter from './../general/dateFormatter'

const NameSelector = (props) => {
  const[name, setName] = useState(props.initial)
  if( !props.visibility ) return(<></>)
  const changeName = (event) => {
    props.setNewName(event.target.value)
    setName(event.target.value)
    
  }
  return(
    <Input type="text" label="Name" value={name} onChange={changeName}/>
  )
}

const DatePicker = (props) => {
  if( !props.visibility ) return(<></>)

  if(props.fetchDate){
    return(
      <Input label="Fetch date from metadata" type="checkbox" icon="calendar" checked={props.fetchDate} onChange={props.toggleFetch}/>
    )
  }else return(
    <>
      <Input label="Fetch date from metadata" type="checkbox" icon="calendar" checked={props.fetchDate} onChange={props.toggleFetch}/>
      <Input label="Start date" icon="empty" type="text" name="startdate" value={props.startDate} placeholder="dd/mm/yyyy, required" onChange={props.changeDate}/>
      <Input label="End date" icon="empty" type="text" name="enddate" value={props.endDate} placeholder="dd/mm/yyyy" onChange={props.changeDate}/>
    </>
  )
}

const Options = (props) => {
  const [newName, setNewName] = useState('')
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [locationPickerActive, setLocationPickerActive] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [fetchDate, setFetchDate] = useState(true)
  const [hasSpecial, setHasSpecial] = useState(false)

  if( !props.visibility ) return(<></>)

  const saveState = () => {
    const name = newName
    const daterange = {
      auto:fetchDate,
      start: fetchDate ? null : startDate,
      end: fetchDate ? null : endDate
    }
    props.setOptions(name, daterange)
    props.toggleVisibility()
  }

  const toggleFetch = () => {
    setFetchDate(!fetchDate)
  }
  const changeDate = (event) => {
    if(event.target.name === "startdate"){
      dateFormatter( event.target.value, startDate, setStartDate )
    }else if(event.target.name === 'enddate'){
      dateFormatter( event.target.value, endDate, setEndDate )
    }
  }

  return(
    <>
      <NameSelector visibility={ !(showSubmenu || locationPickerActive) } initial={newName} setNewName={setNewName}/>
      <LocationPicker visibility={!showSubmenu} setLocationPickerActive={setLocationPickerActive} setHasLocation={props.setHasLocation}/>
      <DatePicker visibility={ !(showSubmenu || locationPickerActive) } toggleFetch={toggleFetch} changeDate={changeDate} fetchDate={fetchDate} startDate={startDate} endDate={endDate}/>
      <ToggleSubMenu visibility={ !(showSubmenu || locationPickerActive) } value="Special" setSubmenuVisibility={setShowSubmenu} />
      <Save visibility={ !(showSubmenu || locationPickerActive) } toggleVisibility={saveState}/>
      <SpecialOptions visibility={showSubmenu} hasSpecial={hasSpecial} setHasSpecial={setHasSpecial} toggleVisibility={setShowSubmenu}/>
    </>
  )
}
const mapStateToProps = (state) => {
  return{
    options:state.form.createPhoto,
    saved:state.form.createPhoto.saved
  }
}
export default connect(mapStateToProps, {setOptions})(Options)