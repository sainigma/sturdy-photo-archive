const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const userRouter = require('./controllers/users')

app.use('/api/users',userRouter)

module.exports = app