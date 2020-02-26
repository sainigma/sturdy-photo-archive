import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'

const Label = (props) => {
  return (
    <>
      <div className="labelcontainer">
        {props.label.name}
      </div>
    </>
  )
}

const Labels = (props) => {
  const [collapsed,setCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const labels = [
    {
      id: '1',
      name: 'nature'
    },
    {
      id: '213',
      name: 'forest'
    },
    {
      id: '321',
      name: 'sunset'
    }
  ]

  return (
    <SectionToggler
      title="Labels"
      size={labels.length}
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <div>
        {labels.map(label => <Label key={label.id} label={label} />)}
        <Label label={{ id: '-1', name: 'Create new' }} />
      </div>
    </SectionToggler>
  )
}

export default Labels