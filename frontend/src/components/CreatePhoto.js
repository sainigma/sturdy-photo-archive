import React, {useState} from 'react'
import { connect } from 'react-redux'
import Options from './CreatePhoto/Options'
import FileSelector from './CreatePhoto/FileSelector'
import Input from './general/Input'
import ToggleSubMenu from './general/ToggleSubmenu'
import {uploadFile,uploadReset} from './../reducers/uploadReducer'
import {resetCreatephoto} from './../reducers/formReducer'

const PreviewImage = (props) => {
  if( props.file && props.visibility ){
    const fileurl = URL.createObjectURL(props.file)
    return(
      <img src={fileurl}/>
    )
  }else return(<></>)
}

const CreatePhoto = (props) => {
  const [uploadActive, setUploadActive] = useState(false)
  const [hasFile, setHasFile] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(undefined)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [waitStatus, setWaitStatus] = useState(false)

  const toggleUploadActive = () => {
    setUploadActive(!uploadActive)
  }

  if( !uploadActive ){
    if( hasFile ) setHasFile(false)
    if( hasLocation ) setHasLocation(false)
    if( fileToUpload ) setFileToUpload(undefined)
    if( showSubmenu ) setShowSubmenu(false)

    return(
      <Input type="button" icon="file" value="Upload photo" onClick={toggleUploadActive}/>
    )
  }

  const user = props.user
  const uploadFunction = props.uploadFile
  const formData = props.form

  const Save = (props) => {
    const labels = {
      ...formData.createPhoto
    }
    const sendFile = () => {
      console.log(props.form)
      uploadFunction(user, fileToUpload, labels)
      setWaitStatus(true)
    }

    if( !props.visibility )return(<></>)
    return(
      <Input type={"button"} icon={"save"} value="Save" onClick={sendFile}/>
    )
  }

  if(waitStatus && props.upload.status!==0){
    if(props.upload.status===200){
      toggleUploadActive()
    }else{
      console.log("fail")
    }
    setWaitStatus(false)
  }

  return(
    <div className="createPhotoContainer">
      <PreviewImage visibility={!showSubmenu} file={fileToUpload}/>
      <FileSelector visibility={!showSubmenu} parentHasFile={hasFile} setHasFile={setHasFile} setFileToUpload={setFileToUpload}/>
      <ToggleSubMenu visibility={!showSubmenu} value="Options" setSubmenuVisibility={setShowSubmenu} />
      <Options visibility={showSubmenu} toggleVisibility={setShowSubmenu} hasLocation={hasLocation} setHasLocation={setHasLocation}/>
      {hasFile ? <Save form={props.form} visibility={!showSubmenu}/> : <></>}
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

export default connect(mapStateToProps,{uploadFile,uploadReset,resetCreatephoto})(CreatePhoto)