import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)
//dev only!
window.store = store

export default store
