import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import reducer from './reducer'
import history from '../history'
import randomId from '../middlewares/randomId'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger, randomId)

const store = createStore(reducer, enhancer)

//dev only!
window.store = store

export default store