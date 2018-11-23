import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducks/people'
import { saga as authSaga } from '../ducks/auth'

export default function*() {
  yield all([peopleSaga(), authSaga()])
}
