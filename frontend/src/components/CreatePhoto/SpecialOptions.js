import React, {useState} from 'react'
import Input from './../general/Input'
import {Save} from './../general/ToggleSubmenu'
import { setSpecial} from './../../reducers/formReducer'
import { connect } from 'react-redux'
import { varExists } from './../../utils/utils'

const SpecialOptions = (props) =>{

  const [ panorama, setPanorama ] = useState(false)
  const [ equirectangular, setEquirectangular ] = useState(false)
  const [ azimuth, setAzimuth ] = useState('')
  const [ altitude, setAltitude ] = useState('')
  const [ height, setHeight ] = useState('')
  const [ lateral, setLateral ] = useState('')
  const [ longitudal, setLongitudal ] = useState('')
  const [ loaded, setLoaded ] = useState(false)

  if(!props.visibility)return(<></>)

  if( varExists(props.saved) && props.saved.special && !loaded ){
    setPanorama( props.special.panorama )
    setEquirectangular( props.special.equirectangular )
    setAzimuth( props.special.azimuth ? props.special.azimuth : '' )
    setAltitude( props.special.altitude ? props.special.altitude : '' )
    setHeight( props.special.height ? props.special.height : '' )
    setLateral( props.special.xoffset ? props.special.xoffset : '' )
    setLongitudal( props.special.yoffset ? props.special.yoffset : '' )
    setLoaded(true)
  }

  const togglePanorama = () => {
    setPanorama(!panorama)
    if( !panorama && equirectangular )setEquirectangular(false)
  }
  const toggleEquirectangular = () => {
    setEquirectangular(!equirectangular)
  }

  const changeNumber = (event) => {
    if( !isNaN(event.target.value) || event.target.value === '-' ){
      if( event.target.name === 'azimuth' ){ 
        if( event.target.value >= 0 && event.target.value <= 360 ) setAzimuth( event.target.value )
      }else if( event.target.name === 'altitude' ){
        if( event.target.value >= -90 && event.target.value <= 90 || event.target.value === '-') setAltitude( event.target.value)
      }else if( event.target.name ==='height' ){
        if( event.target.value >= -418 && event.target.value <= 8900 || event.target.value === '-') setHeight( event.target.value)
      }else if( event.target.name ==='lateral'){
        if( event.target.value >= -10 && event.target.value <= 10 || event.target.value === '-') setLateral( event.target.value)
      }else if( event.target.name ==='longitudal' ){
        if( event.target.value >= -10 && event.target.value <= 10 || event.target.value === '-') setLongitudal( event.target.value)
      }
    }
  }

  const saveState = () => {
    const newSpecial = {
      panorama,
      equirectangular,
      azimuth: !isNaN(azimuth) ? azimuth : null,
      altitude: !isNaN(altitude) ? altitude : null,
      height: !isNaN(height) ? height : null,
      xoffset: !isNaN(lateral) ? lateral : null,
      yoffset: !isNaN(longitudal) ? longitudal : null
    }
    props.setSpecial(newSpecial)
    props.toggleVisibility()
  }

  return(
    <>
      <Input type="checkbox" label="Panorama" checked={panorama} value={panorama} onChange={togglePanorama}/>
      <Input type="checkbox" visibility={panorama} checked={equirectangular} label="Equirectangular" value={equirectangular} onChange={toggleEquirectangular}/>
      <Input type="text" label="Azimuth" name="azimuth" value={azimuth} onChange={changeNumber}/>
      <Input type="text" label="Altitude" name="altitude" value={altitude} onChange={changeNumber}/>
      <Input type="none" icon="map" label="Offsets"/>
      <Input type="text" label="Height" name="height" value={height} onChange={changeNumber}/>
      <Input type="text" label="Lateral" name="lateral" value={lateral} onChange={changeNumber}/>
      <Input type="text" label="Longitudal" name="longitudal" value={longitudal} onChange={changeNumber}/>
      <Save visibility={true} toggleVisibility={saveState}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    special:state.form.createPhoto.special,
    saved:state.form.createPhoto.saved
  }
}

export default connect(mapStateToProps, {setSpecial})(SpecialOptions)