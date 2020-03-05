import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import IconButton from './general/IconButton'
import Closer from './general/Closer'

const GeneralMenu = (props) => {
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      moi
    </div>
  )
}
const UserMenu = (props) => {
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      mio2
    </div>
  )
}

const HamburgerMenu = (props) => {
  const [active, setActive] = useState(false)

  const changeMenu = (event) => {
    setActive(event.target.attributes.type.value)
  }

  const exit = () => {
    setActive(false)
  }

  if( !active ){
    return(
      <>
        <div className="mainactioniconleft">
          <IconButton icon='hamburger' onClick={changeMenu} type='general'/>
        </div>
        <div className="mainactioniconleft2nd">
          <IconButton icon='user' onClick={changeMenu} type='user'/>
        </div>
      </>
    )
  }
  switch(active){
    case 'general':
      return( <GeneralMenu exit={exit}/> )
    case 'user':
      return( <UserMenu exit={exit}/> )
    default:
      setActive(false)
      break
  }
}

const mapStateToProps = (state) => {
  return{
    appstate:state.appstate,
  }
}

export default connect(mapStateToProps,null)(HamburgerMenu)