import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import Input from '../general/Input'

const Label = (props) => {
  const [labelName,setLabelName] = useState('')
  const [newLabel, setNewLabel] = useState(false)

  const activateLabeler = () => {
    setNewLabel(true)
  }
  const modifyLabel = (event) => {
    setLabelName(event.target.value)
  }
  const submitLabel = () => {
    setNewLabel(false)
    props.newLabel(props.label.target, labelName)
  }

  return (
    <>
        { !newLabel || props.label.id !== '-1' 
          ? <div className="labelcontainer">
              <div className="labeltitle" onClick={activateLabeler}>
                {props.label.name}
              </div>
              <div className="labelcloser">
                {props.label.id !== '-1'
                  ? <IconButton icon="close" invert={true}/>
                  : <></>
                }
              </div>
            </div>
          : <div className='labelinputcontainer'>
              <div className='floatLeft'>
                <Input type='text' placeholder='Type new label..' icon='null' value={labelName} onChange={modifyLabel}/>
              </div>
              <div className='floatLeft'>
                <Input type='button' icon='null' value='ok' onClick={submitLabel}/>
              </div>
            </div>
        }
    </>
  )
}

const Labels = (props) => {
  const [collapsed,setCollapsed] = useState(props.collapsed ? props.collapsed : false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const labels2 = props.labels ? props.labels : [
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
    },
    {
      id: '12',
      name: 'nature'
    },
    {
      id: '2132',
      name: 'forest'
    },
    {
      id: '3212',
      name: 'sunset'
    },
    {
      id: '122',
      name: 'nature'
    },
    {
      id: '21322',
      name: 'forest'
    },
    {
      id: '32122',
      name: 'sunset'
    },
    
  ]

  const labels = props.labels ? props.labels : []
  return (
    <SectionToggler
      title={ props.album ? "Albums" : "Labels" }
      size={labels.length}
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <div>
        {labels.map(label => <Label key={label.id} label={label} />)}
        <Label newLabel={props.newLabel} label={{ id: '-1', target:props.id, name: 'Create new' }} />
      </div>
    </SectionToggler>
  )
}

export default Labels