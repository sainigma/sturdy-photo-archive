import React, {useState} from 'react'
import Input from './../general/Input'

const FileSelector = (props) => {
  return(
    <Input type={"button"} icon={"file"} value={"Choose photo"}/>
  )
}

export default FileSelector