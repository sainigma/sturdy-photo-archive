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
const locationRouter = require('./controllers/locations')
const photoRouter = require('./controllers/photos')
const commentRouter = require('./controllers/comments')

app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/files',fileRouter)
app.use('/api/locations',locationRouter)
app.use('/api/photos',photoRouter)
app.use('/api/comments',commentRouter)
app.use(express.static('public'))
module.exports = app