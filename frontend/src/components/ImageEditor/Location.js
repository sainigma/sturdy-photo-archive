import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import LocationPicker from '../CreatePhoto/LocationPicker'

const LocationLabels = (props) => {
  const labelClicker = (event) => {
    props.setSelectActive(true)
  }
  const removeLabel = (event) => {

  }
  if( props.location !== null ){
    return(
    <div className="labelcontainer">
      <div className="labeltitle" onClick={labelClicker}>
        {
          props.location.id !== '-1'
            ? props.location.name
            : 'Add location'
        }
      </div>
      <div className="labelcloser">
        {
          props.location.id !== '-1'
            ? <IconButton icon="close" onClick={removeLabel} invert={true}/>
            : <></>
        }
      </div>
    </div>
  )} else return (<></>)
}

const Location = (props) => {
  const [collapsed,setCollapsed] = useState( props.location===null ? true : false )
  const [selectActive, setSelectActive] = useState(false)
  const [locationPickerActive, setLocationPickerActive] = useState(false)
  const [newLocation, setNewLocation] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const changeLocation = (value) => {
    setNewLocation(value)
    console.log("jotain tapahtui!")
  }

  return (
    <SectionToggler
      title="Location"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      {
        !selectActive
          ? <LocationLabels setSelectActive={setSelectActive} location={ props.location !== null ? props.location : {id:'-1'} }/>
          : <LocationPicker visibility={true} setLocationPickerActive={setLocationPickerActive} newLocation={newLocation} setNewLocation={changeLocation}/>
      }
    </SectionToggler>
  )
}

export default Location