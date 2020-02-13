const varExists = (varToTest) => {
  if( typeof varToTest === 'undefined' || varToTest === null ){
    return false
  } else return true
}

module.exports = {
  varExists
}