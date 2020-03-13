import React,{useState} from 'react'
import { connect } from 'react-redux'
import IconButton from '../../general/IconButton'
import Input from '../../general/Input'
import {modifyTitle} from '../../../reducers/photoReducer'

const Title = (props) => {
  const [editorActive, setEditorActive] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const toggleEditor = () => {
    setEditorActive(!editorActive)
  }

  const saveTitle = () => {
    props.modifyTitle(props.id, newTitle)
    toggleEditor()
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
          <Input type="button" icon="null" value={ newTitle === '' ? 'cancel' : 'save' } onClick={ newTitle === '' ? toggleEditor : saveTitle }/>
        </div>
      </div>
    )
  }
}
export default connect(null,{ modifyTitle })(Title)