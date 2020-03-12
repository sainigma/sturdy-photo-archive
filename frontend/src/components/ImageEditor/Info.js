import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import Input from '../general/Input'

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
        <h3 className="inline">{title} </h3>
        {
          props.hasEditRights ?
          <div className="inlineblock" style={{width:'1em',height:'1em'}}>
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

const Like = (props) => {
  return(
    <>Like
    </>
  )
}

const Info = (props) => {
  const [collapsed,setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const pad = (value) => {
    return ("0"+value).slice(-2)
  }
  let date = new Date(0)
  let dateEnd = new Date(0)
  date.setUTCSeconds( props.daterange[0] )
  dateEnd.setUTCSeconds( props.daterange[1] )
  const trueDateStart = `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`
  const trueDateEnd = `${pad(dateEnd.getDate())}/${pad(dateEnd.getMonth()+1)}/${dateEnd.getFullYear()}`

  return (
    <SectionToggler
      title="Information"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <Title name={props.name} hasEditRights={props.hasEditRights}/>
      <p>{ props.daterange[0] === props.daterange[1] ?
        `Date: ${ trueDateStart }`:
        `Daterange: ${trueDateStart} - ${trueDateEnd}`
        }
      </p>
      <p>Description:</p>
      <Like/>
    </SectionToggler>
  )
}

export default Info