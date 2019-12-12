const userRouter = require('express').Router()
const User = require('./../queries/user')

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
      const hasErrors = User.createNew(username,password,email)
      if(!hasErrors){
        result.status=200
        result.message="new user created, waiting verification"
      }else result.message = result.message+" : error in user or verification creation"

    }
    else result.message = result.message+" : user already exists"
  }
  return result
}

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

module.exports = userRouter