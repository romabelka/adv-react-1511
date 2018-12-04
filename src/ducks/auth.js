import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'
import {
  all,
  call,
  put,
  takeEvery,
  select,
  take,
  fork
} from 'redux-saga/effects'
import { delay, eventChannel, buffers } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_FAIL = `${prefix}/SIGN_UP_FAIL`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_IN_LIMIT_REACHED = `${prefix}/SIGN_IN_LIMIT_REACHED`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  user: null,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user).set('loading', false)

    case SIGN_UP_START:
      return state.set('loading', true)

    case SIGN_UP_FAIL:
      return state.set('error', error)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const loadingSelector = (state) => state[moduleName].loading
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)

/**
 * Init logic
 */

// api.onAuthStateChanged((user) => {
//   window.store &&
//     window.store.dispatch({
//       type: SIGN_IN_SUCCESS,
//       payload: { user }
//     })
// })

/**
 * Action Creators
 * */
export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

/**
 * Sagas
 **/

export function* signInSaga() {
  while (true) {
    for (let i = 0; i < 3; i++) {
      const action = yield take(SIGN_IN_REQUEST)

      const {
        payload: { email, password }
      } = action

      try {
        const user = yield call(api.signIn, email, password)

        yield put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })

        i = 0
      } catch (error) {
        yield put({
          type: SIGN_IN_ERROR,
          error
        })
      }
    }

    yield put({
      type: SIGN_IN_LIMIT_REACHED
    })

    yield delay(3000)
  }
}

export function* signUpSaga({ payload: { email, password } }) {
  if (yield select(loadingSelector)) return

  yield put({
    type: SIGN_UP_START
  })

  try {
    const user = yield call(api.signUp, email, password)

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_FAIL,
      error
    })
  }
}

export const isAppInitialized = () => {
  return typeof window !== 'undefined'
}

export const createAuthStateChangedChannel = () =>
  eventChannel(
    (emit) =>
      api.onAuthStateChanged(
        (user) => emit({ data: user }),
        (authError) => emit({ error: authError })
      ),
    buffers.dropping(100)
  )

export function* onAuthChangedSaga() {
  const channel = yield call(createAuthStateChangedChannel)

  while (true) {
    const { data, error } = yield take(channel)

    try {
      if (data) {
        yield put({
          type: SIGN_IN_SUCCESS,
          payload: { user: data }
        })
      }

      if (error) {
        yield put({
          type: SIGN_IN_ERROR,
          payload: { error }
        })
      }
    } catch (e) {
      yield put({
        type: SIGN_IN_ERROR,
        payload: { error }
      })
    }
  }
}

export function* saga() {
  yield fork(onAuthChangedSaga)
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
