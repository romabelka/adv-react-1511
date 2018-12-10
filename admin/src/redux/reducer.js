import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import peopleReducer, { moduleName as peopleModule } from '../ducks/people'
import eventsReducer, { moduleName as eventsModule } from '../ducks/events'
import history from '../history'

export default combineReducers({
  form,
  router: connectRouter(history),
  [authModule]: authReducer,
  [peopleModule]: peopleReducer,
  [eventsModule]: eventsReducer
})
