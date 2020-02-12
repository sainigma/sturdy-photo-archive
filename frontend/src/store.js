import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import appStateReducer from './reducers/appStateReducer'
import formReducer from './reducers/formReducer'

const reducer = combineReducers({
  user: userReducer,
  appstate: appStateReducer,
  form: formReducer,
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store