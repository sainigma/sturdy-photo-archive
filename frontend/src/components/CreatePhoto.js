import React, {useState} from 'react'
import { connect } from 'react-redux'
import LocationPicker from './CreatePhoto/LocationPicker'
import FileSelector from './CreatePhoto/FileSelector'

const CreatePhoto = (props) => {

  return(
    <div className="createPhotoContainer">
      <FileSelector/>    
      <LocationPicker/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    form:state.form,
  }
}

export default connect(mapStateToProps,null)(CreatePhoto)