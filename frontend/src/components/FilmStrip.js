import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Closer from './general/Closer'
import { changeView } from './../reducers/appStateReducer'
import { conductSearch } from './../reducers/photoReducer'
import PreviewLocation from './MainScreen/PreviewLocation'

const PreviewImage = (props) => {
  if( !props.photo )return(<div className="filmstripPreview" ></div>)
  return(
    <div className="filmstripPreview" >{props.photo.id}</div>
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
    setActive(true)
  }

  const testi = (event) => {
    const targetId = event.target.attributes.value
    const foundPhoto = props.photos.searchresult.find( photo => photo.id === targetId )
    setSelectedPhoto(foundPhoto)
    console.log(props.photos.searchresult)
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