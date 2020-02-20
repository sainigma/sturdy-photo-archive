import React, {useState, useEffect} from 'react'
import AvailableLocations from './Location/AvailableLocations'
import Input from '../general/Input'
import { setLocation } from '../../reducers/formReducer'
import { connect } from 'react-redux'

const LocationPicker = (props) => {
  const [active, setActive] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [locationName, setLocationName] = useState('')

  const toggleActive = () => {
    setActive( !active )
  }

  useEffect( ()=>{
    if( props.form.createPhoto.location.name !== '' &&  !hasLocation ){
      setHasLocation(true)
      setLocationName( props.form.createPhoto.location.name )
    }
    console.log("moi!")
  },[])
  
  if( !props.visibility ) return(<></>)

  const saveLocation = (parameters) => {
    props.setLocation( parameters.values, parameters.type )
    console.log(parameters)
    setLocationName( parameters.values.name )
    setActive(false)
    setHasLocation(true)
  }
  
  if( active ){
    return (
      <div>
        <AvailableLocations saveLocation={saveLocation} setLocationPickerActive={props.setLocationPickerActive}/>
      </div>
    )
  } else {
    if( !hasLocation ){
      return (
        <Input type={"button"} icon={"map"} value={"Choose location"} onClick={toggleActive} setShowSubmenu={props.setShowSubmenu} />
      )
    } else{
      return (
        <Input type={"none"} icon={"map"} label={locationName}/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return{
    form:state.form,
  }
}

export default connect(mapStateToProps,{ setLocation })(LocationPicker)