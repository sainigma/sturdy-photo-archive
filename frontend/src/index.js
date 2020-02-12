import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './styles/forms.css'
import './styles/icons.css'
import './styles/index.css'

const render = () => {
  console.log("rendaus")
  ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)