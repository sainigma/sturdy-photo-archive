import React, {useState} from 'react'
import { connect } from 'react-redux'
import LocationPicker from './CreatePhoto/LocationPicker'
import FileSelector from './CreatePhoto/FileSelector'
import Input from './general/Input'

const CreatePhoto = (props) => {
  const [hasFile, setHasFile] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)

  const Save = (props) => {
    return(
      <Input type={"button"} icon={"save"} value="Save"/>
    )
  }

  return(
    <div className="createPhotoContainer">
      <FileSelector setHasFile={setHasFile}/>    
      <LocationPicker setHasLocation={setHasLocation}/>
      {hasFile && hasLocation ? <Save/> : <></>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    form:state.form,
  }
}

export default connect(mapStateToProps,null)(CreatePhoto)