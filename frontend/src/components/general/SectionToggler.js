import React from 'react'
import IconButton from './IconButton'

const SectionToggler = (props) => {
  return (
    <div className="imageeditorsection">
      <div className="sectionheader">
        <h3 className="tighth3">
          {props.title}
          { props.size ? <em>({props.size})</em> : '' }
        </h3>
      </div>
      <div className="sectiontoggler">
        <IconButton
          icon={ props.collapsed ? "angleup" : "angledown" }
          visibility={true}
          invert={true}
          onClick={props.toggleCollapsed}
        />
      </div>
      { props.collapsed ? '' : 
        <div className="imageeditorsectioncontent scroller">
          {props.children}
        </div>
      }
    </div>
  )
}

export default SectionToggler