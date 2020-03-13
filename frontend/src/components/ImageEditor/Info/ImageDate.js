import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import IconButton from '../../general/IconButton'
import Input from '../../general/Input'
import dateFormatter,{dateIsValid} from '../../general/dateFormatter'
import { modifyDate } from '../../../reducers/photoReducer'

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
      if( editorActive ) props.modifyDate( props.id, newDate )
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
export default connect(null,{ modifyDate })(ImageDate)