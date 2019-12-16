const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(bodyParser.json())
const userRouter = require('./controllers/users')

app.use(cors())
app.use('/api/users',userRouter)

module.exports = app