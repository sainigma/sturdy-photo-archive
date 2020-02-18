const varExists = (varToTest) => {
  if( typeof varToTest === 'undefined' || varToTest === null ){
    return false
  } else return true
}

const apostrophize = ( dataToInsert ) => {
  if( dataToInsert ){
    if( typeof dataToInsert === "string" ){
      return "'"+dataToInsert+"'"
    }else if( typeof dataToInsert === "number" ){
      return dataToInsert
    }

  }else return "NULL"
}

module.exports = {
  varExists,
  apostrophize,
}