import React from 'react'
import Input from './../general/Input'

const CommentInput = (props) =>{
  return(
    <>
    <div className="commentfield">
      <Input type="text" icon="null"/>
    </div>
    <div className="commentsubmit">
      <Input type="button" icon="null" value="submit"/>
    </div>
    </>
  )
}

/*
<div style={{width:"49.8%", float:"left"}}><Input name={"login"} type={"button"} icon={"null"} value={"Login"} onClick={handleClick}/></div>
      <div style={{width:"49.8%", float:"right"}}><Input name={"createuser"} type={"button"} icon={"null"} value={"Create user"} onClick={handleClick}/></div>
*/

const Comment = (props) => {

  const pad = (value) => {
    return ("00"+value).slice(-2)
  }

  const timeobject = new Date(props.comment.timestamp)
  const date = `${timeobject.getDate()}/${timeobject.getMonth()+1}/${timeobject.getFullYear()}`;
  const time = `${pad(timeobject.getHours())}:${pad(timeobject.getMinutes())}`

  return(
    <div className="commentcontainer">
      <div className="commenticon"></div>
      <div className="commentinfo">
        <span className="commentor">
          <strong>{props.comment.user}</strong>
        </span>
        <span className="commentdate">{date}</span>
        <div className="commenttime">{time}</div>
        
      </div>
      <div className="commentcontent">{props.comment.content}</div>
    </div>
  )
}

const Comments = (props) => {

  const comments = [
    {
      user:'kekkonen',
      content:'asdf',
      timestamp:Date.now()-3600*1E3
    },
    {
      user:'koivisto',
      content:'flsajflöksdajflksd afasdfasdfj lakfjölasjfökl jafasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jlkjfdöklsajf ölakjfölak jfölajdfölakjdfl klaöjfölasjfl aölf jadfölf',
      timestamp:Date.now()
    },
    {
      user:'koivisto',
      content:'flsajflöksdajflksd afasdfasdfj lakfjölasjfökl jafasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jlkjfdöklsajf ölakjfölak jfölajdfölakjdfl klaöjfölasjfl aölf jadfölf',
      timestamp:Date.now()+4
    },
    {
      user:'koivisto',
      content:'flsajflöksdajflksd afasdfasdfj lakfjölasjfökl jafasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jlkjfdöklsajf ölakjfölak jfölajdfölakjdfl klaöjfölasjfl aölf jadfölf',
      timestamp:Date.now()+2
    },
    {
      user:'koivisto',
      content:'flsajflöksdajflksd afasdfasdfj lakfjölasjfökl jafasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jlkjfdöklsajf ölakjfölak jfölajdfölakjdfl klaöjfölasjfl aölf jadfölf',
      timestamp:Date.now()+8
    },
    {
      user:'koivisto',
      content:'flsajflöksdajflksd afasdfasdfj lakfjölasjfökl jafasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jasdfasdfj lakfjölasjfökl jaflkjfdöklsajf ölakjfölak jlkjfdöklsajf ölakjfölak jfölajdfölakjdfl klaöjfölasjfl aölf jadfölf',
      timestamp:Date.now()+1
    }
  ]

  return(
    <div className="commentsection">
      <div><h3>Comments <em>({comments.length})</em></h3></div>
      <div className="comments scroller">
        { comments.map( comment => <Comment key={comment.timestamp+"comment"} comment={comment} />)  }
      </div>
      <div>
        <CommentInput/>
      </div>
    </div>
  )
}

export default Comments