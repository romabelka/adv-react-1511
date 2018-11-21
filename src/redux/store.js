import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import reducer from './reducer'
import history from '../history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)

const store = createStore(reducer, enhancer)

//dev only!
window.store = store
sagaMiddleware.run(rootSaga)

export default store