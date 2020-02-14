import React, {useState} from 'react'
import LocationCreator from './LocationCreator'
import Input from '../../general/Input'
import { connect } from 'react-redux'
import { setLocation } from '../../../reducers/formReducer'

const AvailableLocations = (props) => {
  const [createNew, setCreateNew] = useState(false)
  const locationList = [{id:"createNewLocation", name:"Create new"}, {id:"separator"}, {id:"32424234", name:"Karin koti"}, {id:"543957435", name:"Mummola"}, {id:"543897589435", name:"Linnanmäki"}]

  const selectionChanged = (event) => {
    console.log(event.target.value)
    if( event.target.value === 'createNewLocation' ){
      setCreateNew(true)
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
    props.saveLocation(parameters)
  }

  if( !createNew ){
    return(
      <>
      <h3 className="formHeading">Choose location</h3>
      <Input type={"select"} icon={"map"} selections={locationList} onChange={selectionChanged}/>
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
    form:state.form,
  }
}

export default connect(mapStateToProps,{setLocation})(AvailableLocations)