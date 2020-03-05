import React, {useState} from 'react'
import CreatePhoto from './CreatePhoto'
import MassUpload from './MassUpload'
import IconButton from './general/IconButton'

const Upload = (props) => {
  const [active,setActive] = useState(false)
  const [singleUpload, setSingleUpload] = useState(false)
  const [massUpload, setMassUpload] = useState(false)

  const toggleActive = () => {
    setActive(!active)
  }

  return(
    <>
    <div className="mainactioniconright" style={ active || !props.loggedIn ? {display:'none'} : {} }>
        <IconButton icon='upload' onClick={toggleActive}/>
    </div>
    <div className="rightsidebar" style={ !props.loggedIn ||!active ? {display:'none'} : {} }>
      <CreatePhoto visibility={!massUpload} exitMenu={toggleActive} setSingleUpload={setSingleUpload}/>
      <MassUpload visibility={!singleUpload} setMassUpload={setMassUpload}/>
    </div>
    </>
  )

}

export default Upload