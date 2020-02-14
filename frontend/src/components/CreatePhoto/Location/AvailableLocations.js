import React, {useEffect, useState} from 'react'
import LocationCreator from './LocationCreator'
import Input from '../../general/Input'
import { connect } from 'react-redux'
import { setLocation } from '../../../reducers/formReducer'
import { getAll } from '../../../reducers/locationReducer'

const AvailableLocations = (props) => {
  const [createNew, setCreateNew] = useState(false)
  const locationDefaults = [{id:"createNewLocation", name:"Create new"}, {id:"separator"}]

  useEffect( ()=>{
    props.getAll(props.user)
  },[])

  const selectionChanged = (event) => {
    const locationList = [...locationDefaults, ...props.locations]
    if( event.target.value === 'createNewLocation' ){
      setCreateNew(true)
      props.setLocationPickerActive(true)
    }else if( event.target.value !== 'selectFieldSeparator0' ){
      const parameters = {
        values:{
          id:event.target.value,
          name: locationList.find( location => location.id === event.target.value ).name
        },
        type: "id"
      }
      props.saveLocation(parameters)
    }
  }

  const processNewLocation = (parameters) => {
    setCreateNew(false)
    props.setLocationPickerActive(false)
    props.saveLocation(parameters)
  }

  if( !createNew ){
    return(
      <>
      <h3 className="formHeading">Choose location</h3>
      <Input type={"select"} icon={"map"} selections={[...locationDefaults, ...props.locations]} onChange={selectionChanged}/>
      </>
    )
  }else{
    return(
      <LocationCreator processNewLocation={processNewLocation}/>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
    form:state.form,
    locations:state.locations.locations
  }
}

export default connect(mapStateToProps,{setLocation, getAll})(AvailableLocations)