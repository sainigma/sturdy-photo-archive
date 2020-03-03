import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Closer from './general/Closer'
import { changeView } from './../reducers/appStateReducer'
import { conductSearch } from './../reducers/photoReducer'
import PreviewLocation from './MainScreen/PreviewLocation'

const PreviewImage = (props) => {
  return(
    <div className="filmstripPreview" ></div>
  )
}

const FilmStrip = (props) => {
  if( !props.visibility )return(<></>)

  useEffect( ()=>{
    //props.updateSelected(props.photo.id)
    props.conductSearch(props.options)
  },[])

  const goHome = () => {
    props.changeView('previous',{})
  }

  console.log(props.options.searchterms)
  const testi = (event) => {
    console.log("moi!")
  }

  let searchterms = ''
  console.log(props.options.searchterms)
  if( props.options.searchterms ){
    searchterms = props.options.searchterms.map( term => term.name+', ' ).toString().slice(0,-2)
  }
 
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goHome}/>
      <PreviewImage/>
      <PreviewLocation 
        location={{id:'searchresult',name:searchterms}}
        photos={ props.photos.searchresult }
        thumbnailOnClick={ testi }
        appendix={"filmstrip"}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    photos:state.photos,
    options:state.appstate.options,
  }
}

export default connect(mapStateToProps,{changeView, conductSearch})(FilmStrip)