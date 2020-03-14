const varExists = (varToTest) => {
  if( typeof varToTest === 'undefined' || varToTest === null ){
    return false
  } else return true
}

const apostrophize = ( dataToInsert ) => {
  if( dataToInsert ){
    if( typeof dataToInsert === "string" ){
      return "'"+sanitize(dataToInsert,"string")+"'"
    }else if( typeof dataToInsert === "number" ){
      return dataToInsert
    }

  }else return "NULL"
}

const sanitize = ( source, type ) => {
  switch( type ){
    case 'string':
      return source.replace(/[`~#$%^*_|+=?;'"<>\{\}\[\]\\\/]/gi, '')
    case 'verification':
      return source.replace(/[`~#%^*|=?;'"<>\{\}\[\]\\]/gi, '')
    case 'int':
      return parseInt(source)
  }
}

module.exports = {
  varExists,
  apostrophize,
  sanitize
}