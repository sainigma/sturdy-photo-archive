import React from 'react'
import PreviewLocation from './MainScreen/PreviewLocation'

const MainScreen = (props) => {
  if(!props.photos.initialized){
    console.log(props.photos)
    console.log("Photos not initialized")
    return(<></>)
  }
  let locations
  if( props.locations.length === 0 ){
    locations = [...props.locations.locations,{id:null,name:'Unlabeled'}]
  }else{
    locations = [{id:null,name:'Unlabeled'}]
  }
  return(
    <div className="mainscreen">
      <div className="mainscreenHeader"/>
      {locations.map( location => <PreviewLocation key={location.id} location={location}/> )}
    </div>
  )
}

export default MainScreen