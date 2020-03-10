import React,{useState} from 'react'
import { connect } from 'react-redux'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import LocationPicker from '../CreatePhoto/LocationPicker'
import {changeLocation} from '../../reducers/photoReducer'

const LocationLabels = (props) => {
  const labelClicker = (event) => {
    props.setSelectActive(true)
  }
  const removeLabel = (event) => {
    props.removeLocation()
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
  const [location, setLocation] = useState(props.location!==null ? props.location : false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const removeLocation = () => {
    props.changeLocation( props.photoId, null, 'Unlabeled' )
    setLocation(null)
  }

  const changeLocation = (location) => {
    setLocation(location)
    props.changeLocation( props.photoId, location )
    setSelectActive(false)
  }

  return (
    <SectionToggler
      title="Location"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      {
        !selectActive
          ? <LocationLabels removeLocation={removeLocation} setSelectActive={setSelectActive} location={ location ? location : {id:'-1'} }/>
          : <LocationPicker visibility={true} setLocationPickerActive={setLocationPickerActive} newLocation={location} setNewLocation={changeLocation}/>
      }
    </SectionToggler>
  )
}

export default connect(null,{changeLocation})(Location)