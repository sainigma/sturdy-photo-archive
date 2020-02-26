import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'

const Info = (props) => {
  const [collapsed,setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SectionToggler
      title="Info"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <p>Description: </p>
      <p>{ props.daterange[0] === props.daterange[1] ?
        `Date: ${props.daterange[0]}`:
        'Daterange'}
      </p>
      <p>People</p>
      <p>Owner: {props.owner}</p>
      <p>Uploader {props.uploader}</p>
    </SectionToggler>
  )
}

export default Info