import React from 'react'
import PreviewLocation from './MainScreen/PreviewLocation'

const MainScreen = (props) => {
  if(!props.photos.initialized)return(<></>)
  const locations = [...props.locations.locations,{id:null,name:'Unlabeled'}]
  return(
    <div className="mainscreen">
      <div className="mainscreenHeader"/>
      {locations.map( location => <PreviewLocation key={location.id} location={location}/> )}
    </div>
  )
}

export default MainScreen