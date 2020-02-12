import React, {useState} from 'react'
import AvailableLocations from './LocationPicker/AvailableLocations'
import Input from '../general/Input'
import { setLocation } from './../../reducers/formReducer'
import { connect } from 'react-redux'

const LocationPicker = (props) => {
  const [active, setActive] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [locationName, setLocationName] = useState('')

  const toggleActive = () => {
    setActive( !active )
  }

  const saveLocation = (parameters) => {
    props.setLocation( parameters.values, parameters.type )
    setLocationName( parameters.values.name )
    setActive(false)
    setHasLocation(true)
    props.setHasLocation(true)
  }

  if( active ){
    return (
      <div>
        <AvailableLocations saveLocation={saveLocation} />
      </div>
    )
  } else {
    if( !hasLocation ){
      return (
        <Input type={"button"} icon={"map"} value={"Choose location"} onClick={toggleActive} />
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