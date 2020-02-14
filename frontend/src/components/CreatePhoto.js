import React, {useState} from 'react'
import { connect } from 'react-redux'
import Options from './CreatePhoto/Options'
import FileSelector from './CreatePhoto/FileSelector'
import Input from './general/Input'
import ToggleSubMenu from './general/ToggleSubmenu'
import {uploadFile} from './../reducers/uploadReducer'

const PreviewImage = (props) => {
  if( props.file && props.visibility ){
    const fileurl = URL.createObjectURL(props.file)
    return(
      <img src={fileurl}/>
    )
  }else return(<></>)
}

const CreatePhoto = (props) => {
  const [hasFile, setHasFile] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(undefined)
  const [showSubmenu, setShowSubmenu] = useState(false)

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

    if( !props.visibility )return(<></>)
    return(
      <Input type={"button"} icon={"save"} value="Save" onClick={sendFile}/>
    )
  }

  return(
    <div className="createPhotoContainer">
      <PreviewImage visibility={!showSubmenu} file={fileToUpload}/>
      <FileSelector visibility={!showSubmenu} setHasFile={setHasFile} setFileToUpload={setFileToUpload}/>
      <ToggleSubMenu visibility={!showSubmenu} value="Options" setSubmenuVisibility={setShowSubmenu} />
      <Options visibility={showSubmenu} toggleVisibility={setShowSubmenu} setHasLocation={setHasLocation}/>
      {hasFile ? <Save visibility={!showSubmenu}/> : <></>}
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

//<LocationPicker visibility={showSubmenu} toggleVisibility={setShowSubmenu} setHasLocation={setHasLocation}/>