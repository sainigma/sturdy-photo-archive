import React, {useEffect, useState, useRef} from 'react'
import Input from './../general/Input'
import { connect } from 'react-redux'

const FileSelector = (props) => {
  const inputFile = useRef(null)
  const [hasFile, setHasFile] = useState(false)
  const [fileName, setFileName] = useState('')

  const setFileToUpload = props.setFileToUpload
  const activateDialog = () => {
    inputFile.current.click()
  }

  const testi = (event) => {
    const newFile = event.target.files[0]
    setFileToUpload(newFile)
    setFileName( newFile.name )
    setHasFile(true)
    props.setHasFile(true)
  }
  
  if( !props.visibility )return(<></>)

  if( !hasFile ){
    return(
      <>
      <input className="hiddenInput" type='file' id='file' ref={inputFile} onChange={testi}/>
      <Input type={"button"} icon={"file"} value={"Choose photo"} onClick={activateDialog}/>
      </>
    )
  } else{
    return(
      <>
      <Input type={"none"} icon={"file"} label={fileName}/>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return{
    form:state.form,
  }
}

export default connect(mapStateToProps,null)(FileSelector)