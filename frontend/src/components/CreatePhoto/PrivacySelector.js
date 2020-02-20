import React, {useState, useEffect} from 'react'
import Input from '../general/Input'

const PrivacySelector = (props) => {
  //const [selected, setSelected] = useState('private')
  const selections = ['public','private','hidden'].map( (item,index) => { return { id:index, name:item } } )

  const selectionChanged = (event) => {
    props.setSelected( selections.find( selection => selection.id === parseInt(event.target.value) ).name )
  }

  return (
    <Input type={"select"} icon={"user"} selections={selections} selected={props.selected} onChange={selectionChanged}/>
  )
}

export default PrivacySelector