require('dotenv').config()

let PORT = process.env.PORT
let SECRET = process.env.SECRET

module.exports = {
  PORT,
  SECRET
}