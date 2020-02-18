import React, {useState} from 'react'
import getIcon from './getIcon'
import { varExists } from './../../utils/utils' 

const Input = (props) => {

  if( varExists(props.visibility) && !props.visibility )return(<></>)

  const Icon = (props) => {
    if( props.icon === 'null' ){
      return(<></>)
    }
    else{
      const iconClass = getIcon(props.icon)
      return(
        <i className={iconClass}/>
      )
    }
  }

  const InputLabel = (props) => {
    if( props.content ){
      return(
        <label className="inputFieldLabel">{props.content}</label>
      )
    }else return (<></>)
  }

  if( props.type !== 'select' && props.type !== 'none' ){
    return(
      <div className="inputContainer">
        <Icon icon={props.icon}/>
        <InputLabel content={props.label}/>
        <input disabled={props.disabled} checked={props.checked} title={props.title} className="inputField" type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onClick={props.onClick} onChange={props.onChange}/>
      </div>
    )
  } else if( props.type === 'select' ){
    let selections = [{id:'separator'},...props.selections]
    selections.forEach( (selection,index) => {
      selection.disabled = false
      if( selection.id === 'separator' ){
        selection.name = " "
        selection.id = "selectFieldSeparator"+index
        index > 0 ? selection.disabled = true : selection.disabled = false
      }
    })
    return(
      <div className="inputContainer">
        <Icon icon={props.icon}/>
        <InputLabel content={props.label}/>
        <select className="selectField" onChange={props.onChange}>
          {selections.map( selection => <option key={"selectField"+selection.id} value={selection.id} disabled={selection.disabled} >{selection.name}</option> )}
        </select>
      </div>
    )
  } else if( props.type === 'none' ){
    return(
      <div className="inputContainer">
        <Icon icon={props.icon}/>
        <InputLabel content={props.label}/>
      </div>
    )
  }

}

export default Input