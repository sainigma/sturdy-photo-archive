const initialState = {
  loading:false,
  messages:[]
}

const exampleState = {
  loading:false,
  messages:[
    {
      content:'',
      timestamp:0,
      autodismiss:true,
    }
  ]
}

const notificationsReducer = (state=initialState,action) => {
  if ( action.type === 'UPLOADPHOTO' ){
    return{
      loading:false,
      messages:[
        {
          autodismiss:true,
          timestamp:Date.now(),
          content: action.status === 200 ? 'Upload successful' : 'Upload unsuccessful',
          success: action.status === 200 ? true : false
        },
        ...state.messages,
      ]
    }
  }else if( action.type === 'notifyUploadStart' ){
    return{
      loading:true,
      messages:state.messages
    }
  }else if( action.type === 'LOGIN' ){

    const content = ( (status)=>{
      switch(status){
        case 401:
          return 'Invalid credentials'
        case 403:
          return 'Account unverified, check your email for verification message'
        default:
          return 'Login successful!'
      }
    })(action.content.status)

    const success = action.content.status === 200 ? true : false

    return{
      loading:false,
      messages:[
        {
          autodismiss:true,
          timestamp:Date.now(),
          content,
          success
        },
        ...state.messages,
      ]
    }
  }
  return state
}

export const notifyUploadStart = () => {
  return{
    type: 'notifyUploadStart'
  }
}

export default notificationsReducer