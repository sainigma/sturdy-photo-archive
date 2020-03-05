const initialState = {
  loading:true,
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
  }else if( action.type === 'initializeUser' || action.type === 'initializePublic' ){
    return{
      loading:false,
      messages:[ ...state.messages ]
    }
  }else if( action.type === 'failedLogin' ){

    const content = ( (status)=>{
      switch(status){
        case 401:
          return 'Invalid credentials'
        case 403:
          return 'Account unverified, check your email for verification message'
        default:
          return 'Something weird happened!'
      }
    })(action.status)
    return{
      loading:false,
      messages:[
        {
          autodismiss:true,
          timestamp:Date.now(),
          content,
          success:false
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