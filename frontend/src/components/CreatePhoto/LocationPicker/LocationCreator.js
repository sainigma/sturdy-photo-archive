import React, {useState} from 'react'
import { connect } from 'react-redux'
import Input from '../../general/Input'
import { setLocation } from '../../../reducers/formReducer'

const LocationCreator = (props) => {
  const [newName, setNewName] = useState('')
  const [newLongitude, setNewLongitude] = useState('')
  const [newLatitude, setNewLatitude] = useState('')

 
  const changeName = (event) => {
    setNewName( event.target.value )
  }

  const changeCoordinate = (event) => {
    if( !isNaN(event.target.value) ){
      if( event.target.name === 'longitude' && event.target.value <= 180 && event.target.value >= -180 ) setNewLongitude( event.target.value )
      else if( event.target.value <= 90 && event.target.value >= -90 ) setNewLatitude( event.target.value )
    }
  }

  const saveLocation = (event) => {
    event.preventDefault()
    if( newName !== '' ){
      props.setLocation(newName,"name")
      props.processNewLocation()
    }else{
      console.log(newName)
    }
  }

  return(
    <div>
        <h3 className="formHeading">Create location</h3>
        <form onSubmit={saveLocation}>
          <Input type={"text"} icon={"label"} placeholder={"required"} name={"name"} label={"Name"} value={newName} onChange={changeName}/>
          <Input type={"text"} icon={"address"} name={"address"} label={"Address"}/>
          <Input type={"text"} icon={"address"} name={"postalcode"} label={"Postal code"}/>
          <Input type={"text"} icon={"address"} name={"city"} label={"City"}/>
          <Input type={"text"} icon={"map"} name={"longitude"} label={"Longitude"} value={newLongitude} onChange={changeCoordinate}/>
          <Input type={"text"} icon={"map"} name={"latitude"} label={"Latitude"} value={newLatitude} onChange={changeCoordinate} />
          <Input type={"submit"} icon={"save"} value={"Save location"}/>
        </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    form:state.form,
  }
}

export default connect(mapStateToProps,{ setLocation })(LocationCreator)