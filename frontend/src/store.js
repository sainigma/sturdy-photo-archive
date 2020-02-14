import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import appStateReducer from './reducers/appStateReducer'
import formReducer from './reducers/formReducer'
import uploadReducer from './reducers/uploadReducer'
import locationReducer from './reducers/locationReducer'

const reducer = combineReducers({
  user: userReducer,
  appstate: appStateReducer,
  form: formReducer,
  upload: uploadReducer,
  locations: locationReducer,
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store