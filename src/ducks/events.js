import { appName } from '../config'
import { Record, List } from 'immutable'
import { call, put, takeEvery } from 'redux-saga/effects'
import api from '../services/api'

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
const ReducerState = Record({
  loading: false,
  error: null,
  events: new List([])
})

const EventRecord = Record({
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS_START:
      return state.set('loading', true)

    case LOAD_EVENTS_SUCCESS:
      return state.set('loading', false).set('events', payload.events)

    case LOAD_EVENTS_FAIL:
      return state.set('loading', false).set('error', payload)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const isEventsLoadingSelector = (state) => state[moduleName].loading

export const errorSelector = (state) => state[moduleName].error

export const eventsSelector = (state) => {
  const events = state[moduleName].events
  return events
}

export function loadEvents() {
  return {
    type: LOAD_EVENTS_REQUEST
  }
}

export function* loadEventsSaga() {
  yield put({
    type: LOAD_EVENTS_START
  })
  try {
    const events = yield call(api.loadEvents)

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
  yield takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)
}
