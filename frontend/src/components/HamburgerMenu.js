import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {setRange} from './../reducers/photoReducer'
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
  let valueStyle = {
    position:'absolute',
    userSelect:'none'
  }

  let left
  if( props.leftPosition !== undefined ){
    style.left = `${props.offset+props.leftPosition}%`
    style.transform = 'translateX(-1em)'
    valueStyle.top = '1em'
    left = 1
  }else if( props.rightPosition !== undefined ){
    style.right = `${ 100 - props.rightPosition + props.offset }%`
    style.transform = 'translateX(1em)'
    valueStyle.bottom = '1em'
    left = 0
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
      left={left}
    ><div style={valueStyle} left={left}>
      <h3 left={left}>{props.value}</h3>
      </div>
    </div>
  )
}

const RangeSlider = (props) => {
  const [ leftCursorPosition, setLeftCursorPosition ] = useState(0)
  const [ rightCursorPosition, setRighCursorPosition ] = useState(100)
  const [ bottomValue, setBottomValue ] = useState(1930)
  const [ topValue, setTopValue ] = useState(2020)
  const [ initialMouse, setInitialMouse ] = useState(-1)
  const [ sliderWidth, setSliderWidth ] = useState(0)
  const cursorOffset = 1
  const rangeBottom = 1930
  const rangeTop = 2020

  const setValues = (bottom,top) => {
    const range = rangeTop - rangeBottom
    const logRange = 10 - 1
    const newBottom = Math.round(range*Math.log10(logRange*bottom*0.01+1)+rangeBottom)
    const newTop = Math.round(range*Math.log10(logRange*top*0.01+1)+rangeBottom)
    if( newBottom !== bottomValue || newTop !== topValue ){
      setBottomValue( newBottom )
      setTopValue( newTop )
      props.setRange( newBottom, newTop )
    }
  }

  const onMouseMove = (event) => {
    if( initialMouse !== -1 ){
      const moveLeft = event.target.attributes.left.value === "1"
      const oldCursorPosition = moveLeft ? leftCursorPosition : rightCursorPosition
      const newPosition = 100* (event.clientX -initialMouse ) / sliderWidth
      if( newPosition > 0 && newPosition < 100 && Math.abs(newPosition - oldCursorPosition)>0.01 ){
        if( moveLeft ){ setLeftCursorPosition( newPosition ) }
        else{ setRighCursorPosition( newPosition ) 
      }
        setInitialMouse( initialMouse + 0.1*(newPosition-oldCursorPosition) )
        setValues( leftCursorPosition, rightCursorPosition )
      }
    }
  }

  const onMouseDown = (event) => {
    if( initialMouse === -1 && event.clientX ){
      const container = document.getElementById(`rangesliderContainer${props.id}`)
      const cursorPosition = event.target.attributes.left.value === "1" ? leftCursorPosition * 0.01 : rightCursorPosition * 0.01
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
      <Cursor offset={cursorOffset} value={topValue} rightPosition={rightCursorPosition} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
    </div>
  )
}

const GeneralMenu = (props) => {
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      <h3>Range</h3>
        <RangeSlider setRange={props.setRange}/>
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
  console.log(props.photos)
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
      return( <GeneralMenu setRange={props.setRange} exit={exit}/> )
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
    photos:state.photos
  }
}

export default connect(mapStateToProps,{setRange})(HamburgerMenu)