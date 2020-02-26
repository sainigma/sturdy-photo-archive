import React,{useState} from 'react'
import Input from './../general/Input'
import SectionToggler from './SectionToggler'

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
  const [collapsed,setCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

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
    <SectionToggler
      title="Comments"
      size={comments.length}
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
        { comments.map( comment => <Comment key={comment.timestamp+"comment"} comment={comment} />)  }
      <CommentInput/>
    </SectionToggler>
  )
}

export default Comments