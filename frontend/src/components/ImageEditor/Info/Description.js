import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import IconButton from '../../general/IconButton'
import Input from '../../general/Input'
import {changeDescription} from '../../../reducers/photoReducer'

const DescriptionEditor = (props) => {
  const setDescription = (event) => {
    props.setDescription(event.target.value)
  }

  return(
    <div style={{width:'90%'}}>
      <textarea className="inputField" rows="5" value={props.description} onChange={setDescription}/>
      <Input type="button" icon="null" value='save' onClick={ props.saveDescription }/>
    </div>
  )
}

const Description = (props) => {
  const [description, setDescription] = useState('')
  const [editorActive, setEditorActive] = useState(false)

  useEffect( ()=>{
    if( props.description !== null ){
      setDescription(props.description)
    }
  },[])

  if( !props.hasEditRights && description === '' )return(<></>)

  const saveDescription = () => {
    console.log("saved")
    props.changeDescription(props.id, description)
    toggleEditor()
  }

  const toggleEditor = () => {
    setEditorActive(!editorActive)
  }

  

  const descriptions = description.split('\n')

  return(
    <div style={{paddingTop:'0.25em'}}>
      <div style={{height:'100%'}}>Description: </div>
      {
        !editorActive
        ?<div className="descriptioncontainer inlineblock">
          {
            description === ''
            ? 'Add description'
            : <p className='descriptionparagraph inline'>{
              descriptions.map( (row, index) => {
                if( index < descriptions.length-1 ){
                  return <span key={`descRow${index}`}>{row}<br/></span>
                }else{
                  return <span key={`descRow${index}`}>{row}</span>
                }
                
            })}
            </p>
          }
          {
            props.hasEditRights
            ? <div className="inlineblock" style={{ width: '1em', height: '1em', paddingLeft:'0.5em' }}>
                <IconButton onClick={toggleEditor} invert={true} icon='edit' />
              </div>
            : ''
          }
        </div>
        :<DescriptionEditor description={description} saveDescription={saveDescription} setDescription={setDescription}/>
      }
    </div>
  )
}

export default connect(null,{changeDescription})(Description)