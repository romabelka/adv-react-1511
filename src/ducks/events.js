import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'
import { all, call, put, takeEvery, select } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
export const LOAD_EVENTS_START = `${prefix}/LOAD_EVENTS_START`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
export const LOAD_EVENTS_FAIL = `${prefix}/LOAD_EVENTS_FAIL`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  events: null,
  error: null
})

const EventRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      return state.set('events', payload.events).set('loading', false)
    case LOAD_EVENTS_START:
      return state.set('loading', true)
    case LOAD_EVENTS_FAIL:
      return state.set('error', error)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const eventsSelector = (state) => state[moduleName].events
export const loadingSelector = (state) => state[moduleName].loading

/**
 * Init logic
 */

/**
 * Action Creators
 * */
export function loadEvents(email, password) {
  return {
    type: LOAD_EVENTS_REQUEST,
    payload: { email, password }
  }
}

/**
 * Sagas
 **/

export function* loadEventsSaga({ payload: { email, password } }) {
  if (yield select(loadingSelector)) return

  yield put({
    type: LOAD_EVENTS_START
  })

  try {
    const events = yield call(api.loadEvents, email, password)

    yield put({
      type: LOAD_EVENTS_SUCCESS,
      payload: { events }
    })
  } catch (error) {
    yield put({
      type: LOAD_EVENTS_FAIL,
      error
    })
  }
}

export function* saga() {
  yield all([takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)])
}
