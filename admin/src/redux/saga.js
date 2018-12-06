import { spawn } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducks/people'
import { saga as authSaga } from '../ducks/auth'
import { saga as eventsSaga } from '../ducks/events'

export default function*() {
  yield spawn(peopleSaga)
  yield spawn(eventsSaga)
  yield spawn(authSaga)
}
