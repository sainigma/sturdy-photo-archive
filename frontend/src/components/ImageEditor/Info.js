import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import ImageDate from './Info/ImageDate'
import Description from './Info/Description'
import Title from './Info/Title'

const Info = (props) => {
  const [collapsed,setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <SectionToggler
      title="Information"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <Title id={props.id} name={props.name} hasEditRights={props.hasEditRights}/>
      <div style={{paddingLeft:'1em'}}>
        <ImageDate id={props.id} daterange={props.daterange} hasEditRights={props.hasEditRights}/>
        <Description id={props.id} description={props.description} hasEditRights={props.hasEditRights}/>
      </div>
    </SectionToggler>
  )
}

export default Info