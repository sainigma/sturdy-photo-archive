const dateFormatter = (inputString, value, onChange) => {
  const dFormat = /^[0-9]{0,2}$/
  const dmFormat = /^[0-9]{1,2}\/[0-9]{0,2}$/
  const dmFringe = /^[0-9]{1,2}\/[0-9]{0,2}\/$/
  const dmyFormat = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{0,4}$/

  if( dFormat.test( inputString ) || dmFormat.test( inputString ) || dmFringe.test( inputString) || dmyFormat.test( inputString ) ){
    const times = inputString.split('/')
    const previousTimes = value.split('/')
    let day = times.length > 0 ? times[0] : null
    let month = times.length > 1 ? times[1] : null
    let year = times.length > 2 ? times[2] : null

    let daySegment = previousTimes.length > 0 ? previousTimes[0] : ''
    let monthSegment = previousTimes.length > 1 ? previousTimes[1] : ''
    let yearSegment = previousTimes.length > 2 ? previousTimes[2] : ''
    if( inputString.length < value.length ){
      if( !year && yearSegment !== '' ){
        year = null
        yearSegment = ''
      }
      if( !month && monthSegment !== '' ){
        month = null
        monthSegment = ''
      }
      if( !day && daySegment !== ''){
        day=null
        daySegment = ''
      }
      if( value[ value.length-1 ] === '/' && inputString[ inputString.length -1 ] !== '/' ){
        if( month ){
          month = null
          monthSegment = ''
        }else{
          day = null
          daySegment = ''
        }
      }
    }
    if(day){
      if( parseInt(day) > 3 && parseInt(day) <10 ) daySegment = `0${parseInt(day)}/`
      else if( parseInt(day) <= 31 ) daySegment = day
      if( day.length === 2 && parseInt(day) <= 31) daySegment = `${day}/`
    }
    if(month){
      if( month.length === 1 && (month === '0' || month === '1') ) monthSegment = month
      else if( parseInt(month)<10 ) monthSegment = `0${parseInt(month)}/`
      else if( parseInt(month)<=12 ) monthSegment = `${parseInt(month)}/`
    }
    if( year ){
      if( year.length === 1 && year[0] === '1' || year[0] === '2' ){
        yearSegment = year
      }else if( year.length === 2 && ( (year[0] === '1' && parseInt(year[1])>7 ) || (year[0] === '2') ) ){
        yearSegment=year
      }else if( year.length > 2 ) yearSegment = year
    }
    onChange(daySegment+monthSegment+yearSegment)
  }
}

export default dateFormatter