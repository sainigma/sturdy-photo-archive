import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUser from './components/CreateUser'
import Login from './components/Login'

const App = (props) => {

  useEffect( ()=>{
    console.log("start")
  },[])

  return(
    <div>
      <Router>
        <Link to="/">main </Link><Link to="/new"> new user </Link><Link to="/login"> login </Link><br/>
        <Route exact path='/new' component={CreateUser}/>
        <Route exact path='/login' component={Login}/>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

export default connect(mapStateToProps,null)(App)