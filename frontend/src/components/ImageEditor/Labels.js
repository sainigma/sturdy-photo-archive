import React,{useState} from 'react'
import SectionToggler from '../general/SectionToggler'
import IconButton from '../general/IconButton'
import Input from '../general/Input'
import { connect } from 'react-redux'
import { changeView } from './../../reducers/appStateReducer'
import { removeLabel } from './../../reducers/photoReducer'

const Label = (props) => {
  const [labelName,setLabelName] = useState('')
  const [newLabel, setNewLabel] = useState(false)

  const labelClicker = () => {
    if( props.label.id === '-1' ){
      setNewLabel(true)
    }else{
      const searchterms = [ ...props.previousLabels, { type:'label', id:props.label.id, name:props.label.name }]
      props.changeView('filmstrip',{
        searchterms
      })
    }
  }
  const removeLabel = () => {
    props.removeLabel(props.target, props.label.id)
  }

  const modifyLabel = (event) => {
    setLabelName(event.target.value)
  }
  const submitLabel = () => {
    setNewLabel(false)
    props.newLabel(props.label.target, labelName)
  }

  return (
    <>
        { !newLabel || props.label.id !== '-1' 
          ? <div className="labelcontainer">
              <div className="labeltitle" onClick={labelClicker}>
                {props.label.name}
              </div>
              <div className="labelcloser">
                {props.label.id !== '-1' && props.hasEditRights
                  ? <IconButton icon="close" onClick={removeLabel} invert={true}/>
                  : <></>
                }
              </div>
            </div>
          : <div className='labelinputcontainer'>
              <div className='floatLeft'>
                <Input type='text' placeholder='Type new label..' icon='null' value={labelName} onChange={modifyLabel}/>
              </div>
              <div className='floatLeft'>
                <Input type='button' icon='null' value='ok' onClick={submitLabel}/>
              </div>
            </div>
        }
    </>
  )
}

const Labels = (props) => {
  const [collapsed,setCollapsed] = useState(props.collapsed ? props.collapsed : false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  let previousLabels = []
  const previousLength = props.previous.length
  if( previousLength > 0 && props.previous[previousLength-1].currentView === 'filmstrip' ){
    previousLabels = props.previous[previousLength-1].options.searchterms
  }

  const labels = props.labels ? props.labels : []
  return (
    <SectionToggler
      title={ props.album ? "Albums" : "Labels" }
      size={labels.length}
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <div>
        {
          labels.map(label =>
          <Label
            key={label.id}
            label={label}
            target={props.id}
            changeView={props.changeView}
            removeLabel={props.removeLabel}
            previousLabels={previousLabels}
            hasEditRights={props.hasEditRights}
          />)
        }
        { 
          props.hasEditRights 
          ? <Label
              newLabel={props.newLabel}
              label={{ id: '-1', target:props.id, name: 'Create new' }} 
            />
          : <></>
        }
      </div>
    </SectionToggler>
  )
}

const mapStateToProps = (state) => {
  return{
    previous:state.appstate.previous,
  }
}

export default connect(mapStateToProps,{changeView,removeLabel})(Labels)