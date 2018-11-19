import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

const enchacer = applyMiddleware(thunk, logger)

const store = createStore(reducer, enchacer)

//dev only!
window.store = store

export default store