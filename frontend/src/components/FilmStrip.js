import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Closer from './general/Closer'
import { changeView } from './../reducers/appStateReducer'
import { conductSearch } from './../reducers/photoReducer'
import PreviewLocation from './MainScreen/PreviewLocation'
const rootURI = 'http://localhost:3001'
const PreviewImage = (props) => {
  if( !props.photo && !props.default )return(<div className="filmstripPreview" ></div>)
  const photo = props.photo ? props.photo : props.default
  return(
    <div className="filmstripPreview" >
      <img
        className="imgeditorimg"
        src={`${rootURI}/photos/${photo.id}.${photo.filetype}`}
      />
    </div>
  )
}

const FilmStrip = (props) => {
  const [searchtermLength, setSearchtermsLength] = useState(0)
  const [active, setActive] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(undefined)

  if( !props.visibility ){
    if( active ){
      setActive(false)
    }
    return(<></>)
  }

  const goBack = () => {
    props.changeView('previous',{})
  }

  const goHome = () => {
    props.changeView('home',{})
  }

  if( !active || ( props.options.searchterms !== undefined && props.options.searchterms.length !== searchtermLength ) ){
    props.conductSearch(props.options)
    setSearchtermsLength( props.options.searchterms.length )
    setSelectedPhoto( props.photos.searchresult[0] )
    setActive(true)
  }

  const testi = (event) => {
    const targetId = event.target.attributes.value.value
    const foundPhoto = props.photos.searchresult.find( ({id}) => id === targetId )
    setSelectedPhoto(foundPhoto)
  }

  let searchterms = ''
  if( props.options.searchterms ){
    searchterms = props.options.searchterms.map( term => term.name+' ' )
  }
 
  return(
    <div className="imgeditorbackground">
      <Closer onClick={goBack} previous={true}/>
      <Closer onClick={goHome}/>
      <PreviewImage
        photo={selectedPhoto}
        default={ props.photos.searchresult[0] }
      />
      <PreviewLocation 
        location={{id:'searchresult',name:searchterms}}
        photos={ props.photos.searchresult }
        thumbnailOnClick={ testi }
        appendix={"filmstrip"}
        notDraggable={true}
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