import './config'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import App from './App'
import store from './redux/store'
import history from './history'
import './mocks'

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root')
)
