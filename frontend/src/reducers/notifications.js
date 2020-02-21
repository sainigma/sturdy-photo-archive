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
        ...state.messages,
        {
          autodismiss:true,
          timestamp:Date.now(),
          content: action.status === 200 ? 'Upload successful' : 'Upload unsuccessful',
          success: action.status === 200 ? true : false
        }
      ]
    }
  }else if( action.type === 'notifyUploadStart' ){
    return{
      loading:true,
      messages:state.messages
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