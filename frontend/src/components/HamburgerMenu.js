import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import IconButton from './general/IconButton'
import Closer from './general/Closer'

const Cursor = (props) => {
  let style = {
    position:'absolute',
    width:'2em',
    height:'2em',
    top:'0em',
    backgroundImage:'url("icons/arrowup.png")',
    backgroundSize:'cover',
    cursor:'pointer'
  }

  if( props.leftPosition !== undefined ){
    console.log( props.leftPosition )
    style.left = `${props.offset+props.leftPosition}%`
    style.transform = 'translateX(-1em)'
  }else if( props.rightPosition !== undefined ){
    style.right = `${ 100 - props.rightPosition + props.offset }%`
    style.transform = 'translateX(1em)'
  }else{
    return <></>
  }
  return(
    <div
      style={style}
      onMouseDown={props.onMouseDown}
      onMouseLeave={props.onMouseUp}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    ><div style={{
      position:'absolute',
      top:'2em'
    }}>
      <h3>{props.value}</h3>
      </div>
    </div>
  )
}

const RangeSlider = (props) => {
  const [ leftCursorPosition, setLeftCursorPosition ] = useState(0)
  const [ rightCursorPosition, setRighCursorPosition ] = useState(100)
  const [ bottomValue, setBottomValue ] = useState(-1)
  const [ topValue, setTopValue ] = useState(-1)
  const [ initialMouse, setInitialMouse ] = useState(-1)
  const [ sliderWidth, setSliderWidth ] = useState(0)
  const cursorOffset = 4
  const rangeBottom = 1970
  const rangeTop = 2020

  const setValues = (bottom,top) => {
    const range = rangeTop - rangeBottom
    const newBottom = Math.round(range*bottom*0.01+rangeBottom)
    const newTop = Math.round(range*top*0.01+rangeBottom)
    if( newBottom !== bottomValue ) setBottomValue( newBottom )
    if( newTop !== topValue ) setTopValue( newTop )
  }

  if( bottomValue === -1 ){
    setValues(leftCursorPosition,rightCursorPosition)
  }

  const onMouseMove = (event) => {
    if( initialMouse !== -1 ){
      console.log( event.clientX )
      const oldCursorPosition = leftCursorPosition
      const percentage = oldCursorPosition / 100
      const newPosition = 100* (event.clientX -initialMouse ) / sliderWidth
      
      if( newPosition > 0 && newPosition < 100 && Math.abs(newPosition - oldCursorPosition)>0.01 ){
        setLeftCursorPosition( newPosition )
        setInitialMouse( initialMouse + 0.4*(newPosition-oldCursorPosition) )
        setValues( leftCursorPosition, rightCursorPosition )
      }
    }
  }

  const onMouseDown = (event) => {
    if( initialMouse === -1 && event.clientX ){
      const container = document.getElementById(`rangesliderContainer${props.id}`)
      const cursorPosition = leftCursorPosition * 0.01
      const slider = container.clientWidth*(1-2*cursorOffset*0.01)
      setSliderWidth( slider )
      setInitialMouse( event.clientX - cursorPosition * slider )
     }
  }
  const onMouseUp = () => {
    if( initialMouse !== -1 ){
      setInitialMouse(-1)
    }
  }

  return(
    <div id={`rangesliderContainer${props.id}`} style={{width:'100%',height:'6em',position:'relative'}}>
      <div id={`rangeslider${props.id}`} style={{
        position:'absolute',
        width:`${100-cursorOffset}%`,
        left:`${cursorOffset/2}`,
        marginLeft:0,
        backgroundColor:'black',
        height:'1em',
        borderRadius:'0.5em',
        border:'0.16em solid black',
        boxShadow: '0px 0px 10px black',
        opacity:'0.6'
      }}/>
      <div style={{
        position:'absolute',
        marginLeft:0,
        top:'0.08em',
        left:`${cursorOffset+leftCursorPosition}%`,
        right:`${ 100 - rightCursorPosition + cursorOffset }%`,
        height:'1em',
        background:'#cccccc',
      }}/>
      <Cursor offset={cursorOffset} value={bottomValue} leftPosition={leftCursorPosition} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
      <Cursor offset={cursorOffset} value={topValue} rightPosition={rightCursorPosition}/><br/><br/>
    </div>
  )
}

const GeneralMenu = (props) => {
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      <h3>Range</h3>
        <RangeSlider/>
      <h3>Sort</h3>
      <h3>Visible locations</h3>
    </div>
  )
}
const UserMenu = (props) => {
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      mio2
    </div>
  )
}

const HamburgerMenu = (props) => {
  const [active, setActive] = useState(false)

  const changeMenu = (event) => {
    setActive(event.target.attributes.type.value)
  }

  const exit = () => {
    setActive(false)
  }

  if( !active ){
    return(
      <>
        <div className="mainactioniconleft">
          <IconButton icon='hamburger' onClick={changeMenu} type='general'/>
        </div>
        <div className="mainactioniconleft2nd">
          <IconButton icon='user' onClick={changeMenu} type='user'/>
        </div>
      </>
    )
  }
  switch(active){
    case 'general':
      return( <GeneralMenu exit={exit}/> )
    case 'user':
      return( <UserMenu exit={exit}/> )
    default:
      setActive(false)
      break
  }
}

const mapStateToProps = (state) => {
  return{
    appstate:state.appstate,
  }
}

export default connect(mapStateToProps,null)(HamburgerMenu)