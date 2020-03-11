import React, { useState } from 'react'
import Icon from './Icon'
import { varExists } from './../../utils/utils'

const InputText = (props) => {
  return (
    <div className="inputContainer">
      <Icon icon={props.params.icon} />
      <InputLabel content={props.params.label} />
      <input 
        className="inputField"
        disabled={props.params.disabled}
        checked={props.params.checked}
        title={props.params.title}
        type={props.params.type}
        placeholder={props.params.placeholder}
        name={props.params.name}
        value={props.params.value}
        onClick={props.params.onClick}
        onChange={props.params.onChange}
        style={ props.params.label ? {} : {width:"100%"} }
      />
      {props.params.children}
    </div>
  )
}

const InputSelector = (props) => {
  let selections = varExists(props.params.useSeparator) ? [{ id: 'separator' }, ...props.params.selections] : props.params.selections
  let defaultValue = varExists(props.params.selected) ? selections.find( selection => selection.name === props.params.selected ).id : 0
  selections.forEach((selection, index) => {
    selection.disabled = false
    if (selection.id === 'separator') {
      selection.name = " "
      selection.id = "selectFieldSeparator" + index
      index > 0 ? selection.disabled = true : selection.disabled = false
    }
  })
  return (
    <div className="inputContainer">
      <Icon icon={props.params.icon} />
      <InputLabel content={props.params.label} />
      <select className="selectField" onChange={props.params.onChange} defaultValue={defaultValue}>
        { selections.map( selection => 
          <option key = { "selectField" + selection.id} value={selection.id} disabled={selection.disabled}>
            {selection.name}
          </option>
        )}
      </select>
    </div>
  )
}

const InputJustLabel = (props) => {
  return (
    <div className="inputContainer">
      <Icon icon={props.params.icon} />
      <InputLabel content={props.params.label} class={"unlimited"} />
    </div>
  )
}

const InputLabel = (props) => {
  if (!props.content) return (<></>)
  const labelClassName = !varExists(props.class) ? "inputFieldLabel" : "inputFieldLabelUnlimited"
  return (
    <label className={labelClassName}>{props.content}</label>
  )
}

const Input = (props) => {
  switch (props.type) {
    case 'select':
      return (<InputSelector params={props}/>)
    case 'none':
      return (<InputJustLabel params={props}/>)
    default:
      return (<InputText params={props}/>)
  }
}

export default Input