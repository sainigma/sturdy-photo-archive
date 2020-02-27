const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('./../queries/user')
const config = require('./../utils/config')
const Security = require('./../utils/security')

const checkUserFields = (params) => {
  return true
}

const createNewUser = async(username, password, email) => {
  let result = {
    status: 400,
    message: "user creation failed"
  }
  if(checkUserFields({username:username,password:password,email:email})){
    const userExists = await User.findOne({username:username})
    if(!userExists){
      const hasErrors = await User.createNew(username,password,email)
      if(!hasErrors){
        result.status=200
        result.message="new user created, waiting verification"
      }else result.message = result.message+" : error in user or verification creation"

    }
    else result.message = result.message+" : user already exists"
  }
  return result
}

userRouter.get('/test', async(req,res,next) => {
  console.log("test")
  const hasToken = Security.checkHeaders(req, false)
  if( hasToken ) res.status(200).end()
  res.status(400).end()
})

userRouter.get('/', async(req,res,next) => {
  
  res.json({viesti:'moi'})
})

//SANITIZATION POINT HERE
userRouter.post('/new', async(req,res,next)=>{
  const body = await req.body
  if(body.username && body.email && body.password){
    const result = await createNewUser(body.username, body.password, body.email)
    res.status(result.status).json({message:result.message})
  }else{
    res.status(400).json({message:"fields missing"})
  }
})

//SANITIZATION POINT HERE
userRouter.post('/verify', async(req,res,next)=>{
  let result = {
    status: 400,
    message: "Verification failed"
  }
  const body = await req.body
  if(body.verification){
    const hasErrors = await User.verify(body.verification)
    if(!hasErrors){
      result.status=200
      result.message="User has been verified"
    }
  }
  res.status(result.status).json(result.message)
})

//SANITIZATION POINT HERE
userRouter.post('/login', async(req,res,next)=>{
  let result = {
    status: 400,
    message: 'Login failed',
    token: null
  }
  const body = await req.body
  if(body.username&&body.password){
    const response = await User.login(body.username,body.password)
    if(!response.hasErrors && response.result && response.active){
      result.token = jwt.sign({ 
        username:response.user,
        id:response.id,
        exp: Math.floor(Date.now()/1000)+3600
      },config.SECRET)
      result.status = 200
      result.message = 'Login successful'
    }else if(!response.hasErrors && response.result && !response.active){
      result.status = 403
      result.message = 'Account unverified'
    }else {
      result.status = 401
      result.message = 'Invalid request'
    }
  }
  res.status(result.status).json({token:result.token,message:result.message})
})
module.exports = userRouter