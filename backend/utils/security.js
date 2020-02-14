const jwt = require('jsonwebtoken')

const checkHeaders = (req, usernameRequired) => {
  console.log( req.headers.authorization )
  if( req && req.headers && req.headers.authorization ){
    const decodedToken = jwt.verify( req.headers.authorization.slice(8), process.env.SECRET )
    if( !decodedToken || ( decodedToken.username !== req.body.username && usernameRequired ) ) return false
    else return true
  }else return false
}

module.exports = {
  checkHeaders
}