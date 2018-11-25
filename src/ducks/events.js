import { appName } from '../config'
import { Record, Map } from 'immutable'
import api from '../services/api'
import { eventChannel } from 'redux-saga'
import {
  all,
  call,
  put,
  takeEvery,
  select,
  fork,
  take
} from 'redux-saga/effects'

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
  events: new Map(),
  error: null
})

// const EventRecord = Record({
//     month: '',
//     submissionDeadline: '',
//     title: '',
//     url: '',
//     when: '',
//     where: '',
// });

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      return state.set('events', new Map(payload.events)).set('loading', false)
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

export const eventsSelector = (state) => state[moduleName].events.toArray()
export const loadingSelector = (state) => state[moduleName].loading

/**
 * Init logic
 */

/**
 * Action Creators
 * */
export function loadEvents() {
  return {
    type: LOAD_EVENTS_REQUEST
  }
}

/**
 * Sagas
 **/
function* readEvents(eventsCollection) {
  const eventsUpdate = yield call(createEventsSubscription, eventsCollection)
  while (true) {
    let action = yield take(eventsUpdate)
    yield put({
      type: LOAD_EVENTS_SUCCESS,
      payload: {
        events: action
      }
    })
  }
}

function* createEventsSubscription(eventsCollection) {
  return new eventChannel((emit) => {
    const update = (data) => emit(data.val())
    eventsCollection.on('value', update)
    return eventsCollection.off
  })
}

function* loadEventsSaga() {
  yield put({
    type: LOAD_EVENTS_START
  })
  yield call(readEvents, window.fb.database().ref('events'))
}

export function* saga() {
  yield all([takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)])
}
