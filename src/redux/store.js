import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import { saga } from '../ducks/people'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)
//dev only!
window.store = store

export default store
