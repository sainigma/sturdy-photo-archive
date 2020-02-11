import React, {useState} from 'react'
import getIcon from './getIcon'

const Input = (props) => {

  const InputLabel = (props) => {
    if( props.content ){
      return(
        <label className="inputFieldLabel">{props.content}</label>
      )
    }else return (<></>)
  }

  const iconClass = getIcon(props.icon)
  if( props.type !== 'select' && props.type !== 'none' ){
    return(
      <div className="inputContainer">
        <i className={iconClass}/>
        <InputLabel content={props.label}/>
        <input className="inputField" type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onClick={props.onClick} onChange={props.onChange}/>
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
        <i className={iconClass}/>
        <InputLabel content={props.label}/>
        <select className="selectField" onChange={props.onChange}>
          {selections.map( selection => <option key={"selectField"+selection.id} value={selection.id} disabled={selection.disabled} >{selection.name}</option> )}
        </select>
      </div>
    )
  } else if( props.type === 'none' ){
    return(
      <div className="inputContainer">
        <i className={iconClass}/>
        <InputLabel content={props.label}/>
      </div>
    )
  }

}

export default Input