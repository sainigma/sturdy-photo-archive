require('dotenv').config()

let PORT = process.env.PORT
let SECRET = process.env.SECRET
let PGCONF = {
  user:process.env.PGUSER,
  host:process.env.PGHOST,
  database:process.env.PGDATABASE,
  password:process.env.PGPASSWORD,
  port:process.env.PGPORT
}
module.exports = {
  PORT,
  SECRET,
  PGCONF
}