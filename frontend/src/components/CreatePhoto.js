import React, {useState} from 'react'
import { connect } from 'react-redux'
import LocationPicker from './CreatePhoto/LocationPicker'
import FileSelector from './CreatePhoto/FileSelector'
import Input from './general/Input'
import {uploadFile} from './../reducers/uploadReducer'

const CreatePhoto = (props) => {
  const [hasFile, setHasFile] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(undefined)

  const user = props.user
  const uploadFunction = props.uploadFile
  const formData = props.form

  const Save = (props) => {
    const labels = {
      name: formData.createPhoto.name,
      location: formData.createPhoto.location,
    }
    const sendFile = () => {
      uploadFunction(user, fileToUpload, labels)
    }

    return(
      <Input type={"button"} icon={"save"} value="Save" onClick={sendFile}/>
    )
  }

  return(
    <div className="createPhotoContainer">
      <FileSelector setHasFile={setHasFile} setFileToUpload={setFileToUpload}/>    
      <LocationPicker setHasLocation={setHasLocation}/>
      {hasFile && hasLocation ? <Save/> : <></>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    form:state.form,
    user:state.user,
    upload:state.upload
  }
}

export default connect(mapStateToProps,{uploadFile})(CreatePhoto)