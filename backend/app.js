const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp/'
}))

app.use(bodyParser.json())
const userRouter = require('./controllers/users')
const fileRouter = require('./controllers/files')

app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/files',fileRouter)

module.exports = app