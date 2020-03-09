import React, {useEffect, useState, useRef} from 'react'
import Input from './../general/Input'
import { connect } from 'react-redux'

const FileSelector = (props) => {
  const inputFile = useRef(null)
  const [hasFile, setHasFile] = useState(false)
  const [fileName, setFileName] = useState('')
  const [visibleDate, setVisibleDate] = useState('')

  const setFileToUpload = props.setFileToUpload
  const activateDialog = () => {
    inputFile.current.click()
  }

  const processFileRef = async(event) => {
    const pad = (value) => {
      return ("0"+value).slice(-2)
    }

    const newFile = await event.target.files[0]
    const date = new Date(newFile.lastModified)
    setFileToUpload(newFile)
    setFileName(newFile.name)
    setVisibleDate( `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()} - ${pad( date.getHours())}:${pad( date.getMinutes())}`  )
    setHasFile(true)
    props.setHasFile(true)
  }
  
  if( !props.visibility )return(<></>)

  if( !hasFile ){
    return(
      <>
      <input className="hiddenInput" type='file' id='file' ref={inputFile} onChange={processFileRef}/>
      <Input type={"button"} icon={"file"} value={"Choose photo"} onClick={activateDialog}/>
      </>
    )
  } else{
    return(
      <>
      <Input type={"none"} icon={"file"} label={fileName}/>
      <Input type={"none"} icon={"calendar"} label={visibleDate}/>
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