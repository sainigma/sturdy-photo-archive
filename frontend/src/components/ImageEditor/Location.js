import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'

const Location = (props) => {
  const [collapsed,setCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SectionToggler
      title="Location"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      Unknown
    </SectionToggler>
  )
}

export default Location