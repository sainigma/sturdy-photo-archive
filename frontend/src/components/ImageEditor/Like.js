import React,{useState,useEffect} from 'react'
import Icon from '../general/Icon'

const Like = (props) => {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  useEffect( ()=>{
    if( props.likes !== null ){
      setLikes(props.likes)
    }
  },[])



  const toggleLike = (props) => {
    if( !liked ){
      setLikes(likes+1)
      setLiked(true)
    }else{
      setLikes(likes-1)
      setLiked(false)
    }
  }

  return(
  <div style={{float:'left',height:'5em'}}>
    <div style={{float:'left', marginTop:'1em', color:'white', borderTopLeftRadius:'0.5em', borderBottomLeftRadius:'0.5em', paddingTop:'0',position:'relative',width:'2em',height:'2.5em', backgroundColor:'#cccccc'}}>
      <div style={{position:'absolute',top:'-25%',right:'0.5em'}}>
        <h4 className='inlineBlock'>{likes}</h4>
      </div>
    </div>
    <div onClick={toggleLike} style={{opacity: liked ? 1 : 0.8, cursor:'pointer', float:'left', marginTop:'1em', color:'white', borderTopRightRadius:'0.5em', borderBottomRightRadius:'0.5em', paddingTop:'0',position:'relative',width:'6em',height:'2.5em', backgroundColor:'#409443'}}>
      <div style={{position:'absolute',top:'7.5%',left:'10%'}}>
        {
          liked
          ? <Icon icon='thumbsup' size='small' invert={true}/>
          : <Icon icon='fist' size='small' invert={true}/>
        }
        
      </div>
      
      <div style={{position:'absolute',top:'-25%',right:'12.5%'}}>
        <h4 className='inlineBlock'>
          {
            liked
            ? 'Liked'
            : 'Like'
          }
        </h4>
      </div>
    </div>
  </div>
  )
}

export default Like