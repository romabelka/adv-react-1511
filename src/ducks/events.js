import { appName } from '../config'
import { Record, List } from 'immutable'
import api from '../services/api'
import { createSelector } from 'reselect'
import { call, put, takeEvery, select } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`
export const EVENTS_START = `${prefix}/EVENTS_START`
export const EVENTS_SUCCESS = `${prefix}/EVENTS_SUCCESS`
export const EVENTS_FAIL = `${prefix}/EVENTS_FAIL`

/**
 * Reducer
 * */
export const ReducerState = Record({
  loading: false,
  events: new List([]),
  error: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action
  switch (type) {
    case EVENTS_START:
      return state.set('loading', true)

    case EVENTS_SUCCESS:
      return state.set('events', payload.events).set('loading', false)

    case EVENTS_FAIL:
      return state.set('error', error).set('loading', false)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const loadingSelector = (state) => state[moduleName].loading
export const errorSelector = (state) => state[moduleName].error
export const eventsSelector = createSelector(
  stateSelector,
  (state) =>
    Object.keys(state.events).reduce((acc, curr) => {
      return acc.concat({
        id: curr,
        ...state.events[curr]
      })
    }, [])
)

/**
 * Action Creators
 * */

export function loadEvents() {
  return {
    type: EVENTS_REQUEST
  }
}

/**
 * Sagas
 **/

export function* loadEventsSaga() {
  if (yield select(loadingSelector)) return

  yield put({
    type: EVENTS_START
  })

  try {
    const events = yield call(api.loadEvents)
    yield put({
      type: EVENTS_SUCCESS,
      payload: { events }
    })
  } catch (error) {
    yield put({
      type: EVENTS_FAIL,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(EVENTS_REQUEST, loadEventsSaga)
}
