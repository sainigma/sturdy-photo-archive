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
      <p>Date</p>
      <p>Owner</p>
      <p>People</p>
      <p>Uploader</p>
    </SectionToggler>
  )
}

export default Info