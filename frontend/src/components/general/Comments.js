import React,{useState} from 'react'
import Input from './../general/Input'
import SectionToggler from './SectionToggler'
import { connect } from 'react-redux'
import {sendComment} from './../../reducers/photoReducer'

const CommentInput = (props) =>{
  const [newComment, setNewComment] = useState('')

  const onChange = (event) => {
    setNewComment(event.target.value)
  }

  const sendComment = () => {
    props.sendComment(props.target, newComment)
    setNewComment('')
  }

  return(
    <>
    <div className="commentfield">
      <Input type="text" icon="null" value={newComment} placeholder="Type new comment here.." onChange={onChange}/>
    </div>
    <div className="commentsubmit">
      <Input type="button" icon="null" value="submit" onClick={sendComment}/>
    </div>
    </>
  )
}

const Comment = (props) => {

  const pad = (value) => {
    return ("00"+value).slice(-2)
  }

  const timeobject = new Date(props.comment.timestamp*1E3)
  const date = `${timeobject.getDate()}/${timeobject.getMonth()+1}/${timeobject.getFullYear()}`;
  const time = `${pad(timeobject.getHours())}:${pad(timeobject.getMinutes())}`

  return(
    <div className="commentcontainer">
      <div className="commenticon"></div>
      <div className="commentinfo">
        <span className="commentor">
          <strong>{props.comment.username}</strong>
        </span>
        <span className="commentdate">{date}</span>
        <div className="commenttime">{time}</div>
        
      </div>
      <div className="commentcontent">{props.comment.content}</div>
    </div>
  )
}

const Comments = (props) => {
  const [collapsed,setCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return(
    <SectionToggler
      title="Comments"
      size={ props.comments ? props.comments.length : 0 }
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
        { props.comments 
          ? props.comments.map( comment => <Comment key={comment.timestamp+"comment"} comment={comment} />)
          : `No comments yet`
        }<br/>
      <CommentInput target={props.id} sendComment={props.sendComment}/>
    </SectionToggler>
  )
}

export default connect(null,{sendComment})(Comments)