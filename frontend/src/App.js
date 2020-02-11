import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import CreatePhoto from './components/CreatePhoto'
const App = (props) => {

  useEffect( ()=>{
    console.log("start")
  },[])

  return(
    <div className="container">
      <CreatePhoto/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,null)(App)