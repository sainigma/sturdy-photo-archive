import React, {useState} from 'react'
import { connect } from 'react-redux'
import Input from '../../general/Input'
import { setLocation } from '../../../reducers/formReducer'
import PrivacySelector from '../PrivacySelector'

const LocationCreator = (props) => {
  const [newName, setNewName] = useState('')
  const [newLongitude, setNewLongitude] = useState('')
  const [newLatitude, setNewLatitude] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newPostal, setNewPostal] = useState('')
  const [newCity, setNewCity] = useState('')
  const [privacy, setPrivacy] = useState('private')

  const changeName = (event) => {
    setNewName( event.target.value )
  }

  const changeCoordinate = (event) => {
    if( !isNaN(event.target.value) ){
      if( event.target.name === 'longitude' && event.target.value <= 180 && event.target.value >= -180 ) setNewLongitude( event.target.value )
      else if( event.target.value <= 90 && event.target.value >= -90 ) setNewLatitude( event.target.value )
    }
  }

  const changeAddress = (event) => {
    if( event.target.name === 'address' ){
      setNewAddress( event.target.value )
    }else if( event.target.name === 'postalcode'){
      setNewPostal( event.target.value )
    }else if( event.target.name === 'city'){
      setNewCity( event.target.value )
    }
  }

  const sendLocation = (event) => {
    event.preventDefault()
    if( newName !== '' ){
      let parameters = {
        values:{
          name:newName,
          address:newAddress,
          postalcode:newPostal,
          city:newCity,
          latitude:newLatitude,
          longitude:newLongitude,
          privacy
        },
        type: "new"
      }
      props.processNewLocation(parameters)
    }else{
      console.log(newName)
    }
  }

  return(
    <div>
        <h3 className="formHeading">Create location</h3>
        <form onSubmit={sendLocation}>
          <Input type={"text"} icon={"label"} placeholder={"required"} name={"name"} label={"Name"} value={newName} onChange={changeName}/>
          <Input type={"text"} icon={"address"} name={"address"} label={"Address"} value={newAddress} onChange={changeAddress}/>
          <Input type={"text"} icon={"address"} name={"postalcode"} label={"Postal code"} value={newPostal} onChange={changeAddress}/>
          <Input type={"text"} icon={"address"} name={"city"} label={"City"} value={newCity} onChange={changeAddress}/>
          <Input type={"text"} icon={"map-marker"} name={"latitude"} label={"Latitude"} title="In decimal form" value={newLatitude} onChange={changeCoordinate} />
          <Input type={"text"} icon={"map-marker"} name={"longitude"} label={"Longitude"} title="In decimal form" value={newLongitude} onChange={changeCoordinate}/>
          <PrivacySelector visibility={true} selected={privacy} setSelected={setPrivacy} label={"Visibility"}/>
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