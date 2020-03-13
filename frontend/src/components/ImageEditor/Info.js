import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import Input from '../general/Input'
import ImageDate from './Info/ImageDate'
import Description from './Info/Description'


const Title = (props) => {
  const [editorActive, setEditorActive] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const toggleEditor = () => {
    setEditorActive(!editorActive)
  }

  const titleChanged = (event) => {
    setNewTitle(event.target.value)
  }

  const title = newTitle === ''
                ? props.name === null
                  ? 'Unnamed'
                  : props.name
                : newTitle

  if( !editorActive ){
    return(
      <div>
        <div className="inlineblock">
          <h3 className="inline">{title} </h3>
        </div>
        
        {
          props.hasEditRights ?
          <div className="inlineblock" style={{width:'1em',height:'1em',paddingLeft:'0.5em'}}>
            <IconButton onClick={toggleEditor} invert={true} icon='edit'/>
          </div>
          : <></>
        }

      </div>
    )
  }else{
    return(
      <div>
        <div className="inlineblock" style={{width:'75%',padding:'2px'}}>
          <Input icon='null' value={newTitle} placeholder='New title..' onChange={titleChanged}/>
        </div>
        <div className="inlineblock" style={{width:'10%'}}>
          <Input type="button" icon="null" value={ newTitle === '' ? 'cancel' : 'save' } onClick={ newTitle === '' ? toggleEditor : toggleEditor }/>
        </div>
      </div>
    )
  }

}

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
      <Title name={props.name} hasEditRights={props.hasEditRights}/>
      <div style={{paddingLeft:'1em'}}>
        <ImageDate id={props.id} daterange={props.daterange} hasEditRights={props.hasEditRights}/>
        <Description id={props.id} description={props.description} hasEditRights={props.hasEditRights}/>
      </div>
    </SectionToggler>
  )
}

export default Info