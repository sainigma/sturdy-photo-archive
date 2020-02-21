import React, {useState} from 'react'
import { connect } from 'react-redux'
import Options from './CreatePhoto/Options'
import FileSelector from './CreatePhoto/FileSelector'
import Input from './general/Input'
import ToggleSubMenu from './general/ToggleSubmenu'
import {uploadFile} from './../reducers/uploadReducer'
import {notifyUploadStart} from './../reducers/notifications'

const PreviewImage = (props) => {
  if( props.file && props.visibility ){
    const fileurl = URL.createObjectURL(props.file)
    return(
      <div className="uploadpreviewContainer">
        <div className="uploadpreviewContent">
          <img className="uploadpreviewImg" src={fileurl}/>
        </div>
        <div className="uploadpreviewBackground" style={{backgroundImage: `url(${fileurl})`}}/>
      </div>
    )
  }else return(<></>)
}
//<img className="uploadpreview" src={fileurl}/>
//
const CreatePhoto = (props) => {
  const [uploadActive, setUploadActive] = useState(false)
  const [hasFile, setHasFile] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(undefined)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [waitStatus, setWaitStatus] = useState(false)
  const [statusTimestamp, setStatusTimestamp] = useState(-1)
  const [lastModified, setLastModified] = useState(0)

  if( !props.visibility )return(<></>)
  const toggleUploadActive = () => {
    props.setSingleUpload(!uploadActive)
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
  const notifyUploadStart = props.notifyUploadStart
  const formData = props.form

  const Save = (props) => {
    let labels = {
      ...formData.createPhoto
    }
    const sendFile = () => {
      labels.lastModified = lastModified
      notifyUploadStart()
      uploadFunction(user, fileToUpload, labels)
      toggleUploadActive()
    }

    if( !props.visibility )return(<></>)
    return(
      <Input type={"button"} icon={"save"} value="Save" onClick={sendFile}/>
    )
  }

  const Cancel = (props) =>{
    if( !props.visibility )return(<></>)
    const runToggleActive = () => {
      toggleUploadActive()
    }
    return(
      <div className="cancelbutton">
        <Input type="button" icon="null" value="cancel" onClick={runToggleActive}/>
      </div>
    )
  }

  if( hasFile && lastModified === 0 ){
    let internalLastModified = fileToUpload.lastModified
    setLastModified( internalLastModified )
  }

  return(
    <div className="createPhotoContainer">
      {!hasFile ? <h3>Single upload</h3> : <></>}
      <Cancel visibility={!showSubmenu && hasFile}/>
      <PreviewImage visibility={!showSubmenu} file={fileToUpload}/>
      <FileSelector visibility={!showSubmenu} parentHasFile={hasFile} setHasFile={setHasFile} setFileToUpload={setFileToUpload} multiple={false}/>
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

export default connect(mapStateToProps,{uploadFile,notifyUploadStart})(CreatePhoto)