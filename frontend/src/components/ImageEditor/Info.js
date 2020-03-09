import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'

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
      title="Info"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <p>Description: </p>
      <p>{ props.daterange[0] === props.daterange[1] ?
        `Date: ${ trueDateStart }`:
        `Daterange: ${trueDateStart} - ${trueDateEnd}`
        }
      </p>
      <p>People</p>
      <p>Owner: {props.owner}</p>
      <p>Uploader {props.uploader}</p>
    </SectionToggler>
  )
}

export default Info