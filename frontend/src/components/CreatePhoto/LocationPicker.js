import React, {useState} from 'react'
import AvailableLocations from './LocationPicker/AvailableLocations'
import Input from '../general/Input'
import { setLocation  } from './../../reducers/formReducer'
import { connect } from 'react-redux'

const LocationPicker = (props) => {
  const [active, setActive] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)

  const toggleActive = () => {
    setActive( !active )
  }

  const confirmLocation = () => {
    console.log(props.form)
    setActive(false)
    setHasLocation(true)
  }

  if( active ){
    return (
      <div>
        <AvailableLocations confirmLocation={confirmLocation} />
      </div>
    )
  } else {
    if( !hasLocation ){
      return (
        <Input type={"button"} icon={"map"} value={"Choose location"} onClick={toggleActive} />
      )
    } else{
      return (
        <Input type={"none"} icon={"map"} label={props.form.createPhoto.name}/>
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