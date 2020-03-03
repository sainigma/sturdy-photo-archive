import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Closer from './general/Closer'
import { changeView } from './../reducers/appStateReducer'
import PreviewLocation from './MainScreen/PreviewLocation'

const PreviewImage = (props) => {
  return(
    <></>
  )
}

const FilmStrip = (props) => {
  if( !props.visibility )return(<></>)

  const goHome = () => {
    props.changeView('previous',{})
  }

  const testi = (event) => {
    console.log("moi!")
  }

  return(
    <div className="imgeditorbackground">
      <Closer onClick={goHome}/>
      <PreviewImage/>
      <PreviewLocation 
        location={{id:null,name:'joku'}}
        photos={ props.photos.owned }
        thumbnailOnClick={ testi }
        appendix={"filmstrip"}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    photos:state.photos,
  }
}

export default connect(mapStateToProps,{changeView})(FilmStrip)