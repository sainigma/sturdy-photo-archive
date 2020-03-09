import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
const LocationLabels = (props) => {
  const labelClicker = (event) => {

  }
  const removeLabel = (event) => {

  }
  if( props.location !== null ){
    return(
    <div className="labelcontainer">
      <div className="labeltitle" onClick={labelClicker}>
        {props.location.name}
      </div>
      <div className="labelcloser">
        {props.location.id !== '-1'
          ? <IconButton icon="close" onClick={removeLabel} invert={true}/>
          : <></>
        }
      </div>
    </div>
  )} else return (<></>)
}

const Location = (props) => {
  const [collapsed,setCollapsed] = useState( props.location===null ? true : false )
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  console.log( props.location )

  return (
    <SectionToggler
      title="Location"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <LocationLabels location={props.location}/>
    </SectionToggler>
  )
}

export default Location