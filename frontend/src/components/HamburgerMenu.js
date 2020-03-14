import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { setRange, sortPhotos } from './../reducers/photoReducer'
import { toggleLocationVisibility } from './../reducers/locationReducer'
import IconButton from './general/IconButton'
import Closer from './general/Closer'
import Input from './general/Input'
import SectionToggler from './general/SectionToggler'

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
  const [ bottomValue, setBottomValue ] = useState(1900)
  const [ topValue, setTopValue ] = useState(2100)
  const [ initialMouse, setInitialMouse ] = useState(-1)
  const [ sliderWidth, setSliderWidth ] = useState(0)
  const cursorOffset = 1
  const rangeBottom = props.rangeBottom
  const rangeTop = props.rangeTop

  useEffect( ()=>{
    setValues( props.leftCursorPosition, props.rightCursorPosition, false )
  },[])


  const setValues = (bottom,top, initialized) => {
    const range = rangeTop - rangeBottom
    const logRange = 10 - 1
    const newBottom = Math.round(range*Math.log10(logRange*bottom*0.01+1)+rangeBottom)
    const newTop = Math.round(range*Math.log10(logRange*top*0.01+1)+rangeBottom)
    if( newBottom !== bottomValue || newTop !== topValue ){
      setBottomValue( newBottom )
      setTopValue( newTop )
      if( initialized )  props.setRange( newBottom, newTop )
    }
  }

  const onMouseMove = (event) => {
    if( initialMouse !== -1 ){
      const moveLeft = event.target.attributes.left.value === "1"
      const oldCursorPosition = moveLeft ? props.leftCursorPosition : props.rightCursorPosition
      const newPosition = 100* (event.clientX -initialMouse ) / sliderWidth
      if( newPosition > 0 && newPosition < 100 && Math.abs(newPosition - oldCursorPosition)>0.01 ){
        if( moveLeft ){ props.setLeftCursorPosition( newPosition ) }
        else{ props.setRighCursorPosition( newPosition ) 
      }
        setInitialMouse( initialMouse + 0.1*(newPosition-oldCursorPosition) )
        setValues( props.leftCursorPosition, props.rightCursorPosition, true )
      }
    }
  }

  const onMouseDown = (event) => {
    if( initialMouse === -1 && event.clientX ){
      const container = document.getElementById(`rangesliderContainer${props.id}`)
      const cursorPosition = event.target.attributes.left.value === "1" ? props.leftCursorPosition * 0.01 : props.rightCursorPosition * 0.01
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
    <div id={`rangesliderContainer${props.id}`} style={{width:'100%',height:'4em',position:'relative'}}>
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
        left:`${cursorOffset+props.leftCursorPosition}%`,
        right:`${ 100 - props.rightCursorPosition + cursorOffset }%`,
        height:'1em',
        background:'#cccccc',
      }}/>
      <Cursor offset={cursorOffset} value={bottomValue} leftPosition={props.leftCursorPosition} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
      <Cursor offset={cursorOffset} value={topValue} rightPosition={props.rightCursorPosition} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
    </div>
  )
}

const Sorter = (props) => {
  const sortTypes = ['none', 'date', 'likes', 'labelcount']

  const changeSortType = (event) => {
    const index = event.target.attributes.value.value
    const sortType = sortTypes[index]
    const ascending = props.sortAscending
    let toReducer = sortType
    if( sortType === 'none' ){
      props.setSortType( sortType )
    }else if( sortType === props.sortType ){
      toReducer += `${!ascending ? 'ascending' : 'descending'}`
      props.setSortAscending( !props.sortAscending )
      props.setSortType( sortType )
    }else{
      toReducer += 'descending'
      props.setSortAscending( false )
      props.setSortType( sortType )
    }
    props.sortPhotos(toReducer)
  }

  const SortType = (props) => {
    let className = 'fakelink'
    let value = props.index
    let direction = ''
    if( props.selected === props.name ){
      className += 'selected'
      if( props.name !== 'none' ){ 
        direction = props.ascending ? '▲' : '▼'
      }
    }

    return(
      <><span className={className} onClick={props.onClick} value={value}>{` ${props.name}${direction} `}</span> |</>
    )
  }
  return(
    <>|
      {sortTypes.map( (type,index) => 
      <SortType 
          key={`SortType${index}`}
          name={type}
          index={index}
          selected={props.sortType}
          ascending={props.sortAscending}
          onClick={changeSortType}
        />
    )}
    </>
  )
}

const LocationMenu = (props) => {
  const toggleLocation = (event) => {
    props.toggleLocationVisibility(event.target.value)
  }
  const toggleAll = () => {
    if( props.allToggled ){
      props.toggleLocationVisibility( 'allOff' )
      props.setAllToggled(false)
    }else{
      props.toggleLocationVisibility( 'allOn' )
      props.setAllToggled(true)
    }

  }

  return(
    <div style={{position:'relative', height:'25em'}}>
      <div style={{height:'100%',overflowY:'auto'}} className='scroller'>
        <Input type='checkbox' icon='null' checked={props.allToggled} onChange={toggleAll} value={props.allToggled} label={<b>All</b>}/>
        { props.locations.map( location =>
          <Input 
            icon='null'
            key={`LocationMenu${location.id}`}
            checked={location.visible !== undefined ? location.visible : true}
            type='checkbox'
            label={location.name}
            value={location.id}
            onChange={toggleLocation}
          />
        ) }
      </div>
      
    </div>
  )
}

const GeneralMenu = (props) => {
  const toggleLocations = () => {
    props.setLocationsCollapsed(!props.locationsCollapsed)
  }
  return(
    <div className="leftsidebar">
      <Closer onClick={props.exit}/>
      <h3>Sort</h3>
        <Sorter 
          sortType={props.sortType}
          setSortType={props.setSortType}
          sortAscending={props.sortAscending}
          setSortAscending={props.setSortAscending}
          sortPhotos={props.sortPhotos}
        />
      <h3>Range</h3>
        <RangeSlider
          setRange={props.setRange}
          rangeTop={props.rangeTop}
          rangeBottom={props.rangeBottom}
          leftCursorPosition={props.leftCursorPosition}
          setLeftCursorPosition={props.setLeftCursorPosition}
          rightCursorPosition={props.rightCursorPosition}
          setRighCursorPosition={props.setRighCursorPosition}
        />
        <SectionToggler
          title='Visible locations'
          collapsed={props.locationsCollapsed}
          toggleCollapsed={toggleLocations}
        >
          <LocationMenu
            locations={props.locations}
            toggleLocationVisibility={props.toggleLocationVisibility}          
            allToggled={props.allToggled}
            setAllToggled={props.setAllToggled}
            />
        </SectionToggler>
    </div>
  )
}

const UserMenu = (props) => {
  return(
    <div className="leftsidebar" style={{height:'4em'}}>
      <Closer onClick={props.exit}/>
      Work in progress
    </div>
  )
}

const HamburgerMenu = (props) => {
  const [active, setActive] = useState(false)
  const [ leftCursorPosition, setLeftCursorPosition ] = useState(0)
  const [ rightCursorPosition, setRighCursorPosition ] = useState(100)
  const [ sortType, setSortType ] = useState('none')
  const [ sortAscending, setSortAscending ] = useState(false)
  const [ locationsCollapsed, setLocationsCollapsed ] = useState(true)
  const [ allToggled, setAllToggled ] = useState(true)

  if( !props.appstate.loggedIn ) return(<></>)

  const changeMenu = (event) => {
    setActive(event.target.attributes.type.value)
  }

  const exit = () => {
    setActive(false)
  }
  
  if( !active || props.appstate.currentView !== 'home' ){
    return(
      <>
        <div className="mainactioniconleft">
          <IconButton icon='hamburger' onClick={changeMenu} type='general'/>
        </div>
        <div className="mainactioniconleft2nd">
          <IconButton icon='userbutton' onClick={changeMenu} type='user'/>
        </div>
      </>
    )
  }
  switch(active){
    case 'general':
      return ( 
        <GeneralMenu
          setRange={props.setRange}

          rangeTop={2020}
          rangeBottom={1970}
          leftCursorPosition={leftCursorPosition}
          setLeftCursorPosition={setLeftCursorPosition}
          rightCursorPosition={rightCursorPosition}
          setRighCursorPosition={setRighCursorPosition}
          
          sortType={sortType}
          setSortType={setSortType}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
          sortPhotos={props.sortPhotos}

          locations={props.locations}
          locationsCollapsed={locationsCollapsed}
          setLocationsCollapsed={setLocationsCollapsed}
          toggleLocationVisibility={props.toggleLocationVisibility}
          allToggled={allToggled}
          setAllToggled={setAllToggled}

          exit={exit}
        />
      )
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
    locations:state.locations.locations,
    photos:state.photos
  }
}

export default connect(mapStateToProps,{setRange,sortPhotos,toggleLocationVisibility})(HamburgerMenu)