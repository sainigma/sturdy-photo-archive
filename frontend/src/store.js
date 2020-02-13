import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import appStateReducer from './reducers/appStateReducer'
import formReducer from './reducers/formReducer'
import uploadReducer from './reducers/uploadReducer'

const reducer = combineReducers({
  user: userReducer,
  appstate: appStateReducer,
  form: formReducer,
  upload: uploadReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store