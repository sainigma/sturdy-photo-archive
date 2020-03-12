import React,{useState,useEffect} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import Input from '../general/Input'
import dateFormatter,{dateIsValid} from '../general/dateFormatter'

const Description = (props) => {
  const [description, setDescription] = useState('')
  useEffect( ()=>{
    if( props.description !== null ){
      setDescription(props.description)
    }
  },[])
  const toggleEditor = () => {}

  if( !props.hasEditRights && description === '' )return(<></>)

  return(
    <div style={{paddingTop:'0.25em'}}>
      <div style={{height:'100%'}}>Description: </div>
      <div style={{height:'100%',paddingTop:'0.25em',paddingLeft:'0.5em'}}>
        {
          description === ''
          ? 'Add description'
          : description
        }
        {
          props.hasEditRights
          ? <div className="inlineblock" style={{ width: '1em', height: '1em', paddingLeft:'0.5em' }}>
              <IconButton onClick={toggleEditor} invert={true} icon='edit' />
            </div>
          : ''
        }
      </div>
    </div>
  )
}

const ImageDate = (props) => {
  const [editorActive, setEditorActive] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [originalStart,setOriginalStart] = useState('')
  const [originalEnd,setOriginalEnd] = useState('')
  const [isValid,setIsValid] = useState(true)

  useEffect( ()=>{
    const pad = (value) => {
      return ("0"+value).slice(-2)
    }
    let date = new Date(0)
    let dateEnd = new Date(0)
    date.setUTCSeconds( props.daterange[0] )
    dateEnd.setUTCSeconds( props.daterange[1] )
    const trueDateStart = `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`
    const trueDateEnd = `${pad(dateEnd.getDate())}/${pad(dateEnd.getMonth()+1)}/${dateEnd.getFullYear()}`
    setNewDate(trueDateStart)
    setOriginalStart(trueDateStart)
    setEndDate(trueDateEnd)
    setOriginalEnd(trueDateEnd)
  },[])

  const toggleEditor = () => {
    if( !isValid ){
      setNewDate( originalStart )
      setEndDate( originalEnd )
    }else{
      setOriginalStart( newDate )
      setOriginalEnd( newDate )
    }
    setEditorActive(!editorActive)
  }

  const changeDate = (event) => {
    const saveDate = (value) => {
      setIsValid( dateIsValid(value) )
      setNewDate( value )
      setEndDate( value )
    }

    dateFormatter( event.target.value, newDate, saveDate )
  }

  if( !editorActive ){
    return (
      <div style={{paddingTop:'0.25em'}}>
        <div className="inlineblock">{newDate}{
          newDate !== endDate
          ? <> - {endDate}</>
          : <></>
        } </div>
        {
          props.hasEditRights ?
            <div className="inlineblock" style={{ width: '1em', height: '1em', paddingLeft:'0.5em' }}>
              <IconButton onClick={toggleEditor} invert={true} icon='edit' />
            </div>
            : <></>
        }
      </div>
    )
  }else{
    return(
      <div>
        <div className="inlineblock" style={{width:'75%',padding:'2px'}}>
          <Input icon='null' value={newDate} placeholder='New title..' onChange={changeDate}/>
        </div>
        <div className="inlineblock" style={{width:'10%'}}>
          <Input type="button" icon="null" value={ !isValid ? 'cancel' : 'save' } onClick={ newDate === '' ? toggleEditor : toggleEditor }/>
        </div>
      </div>
    )
  }
}

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
        <ImageDate daterange={props.daterange} hasEditRights={props.hasEditRights}/>
        <Description description={null} hasEditRights={props.hasEditRights}/>
      </div>
    </SectionToggler>
  )
}

export default Info