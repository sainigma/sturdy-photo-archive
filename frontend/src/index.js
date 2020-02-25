import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './styles/index.css'
import './styles/forms.css'
import './styles/icons.css'
import './styles/imgpreview.css'
import './styles/imageeditor.css'
import './styles/comments.css'

const render = () => {
  ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)