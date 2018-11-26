import { appName } from '../config'
import api from '../services/api'
import { put, call, takeEvery } from 'redux-saga/effects'
import { List, Record } from 'immutable'
import { createSelector } from 'reselect'

/*
actions
 */

export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const LOAD_EVENTS_START = `${prefix}/LOAD_EVENTS_START`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
export const LOAD_EVENTS_FAIL = `${prefix}/LOAD_EVENTS_FAIL`
export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`

/*
reducers
 */
const ReducerState = Record({
  loading: false,
  events: new List([])
})

// const EventRecord = Record({
//   id: null,
//   month: null,
//   submissionDeadline: null,
//   title: null,
//   when: null,
//   where: null,
//   url: null
// })

export default function reducer(state = new ReducerState(), { type, payload }) {
  switch (type) {
    case LOAD_EVENTS_START:
      return state.set('loading', true)

    case LOAD_EVENTS_SUCCESS:
      return state.set('loading', false).set('events', payload.events)

    default:
      return state
  }
}

/*
Selectors
 */
export const stateSelector = (state) => state[moduleName]
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

export const normalizeEvents = (events) => {
  return Object.keys(events).map((keyId) => ({
    id: keyId,
    ...events[keyId]
  }))
}

export const eventsSelector = createSelector(
  stateSelector,
  (state) => normalizeEvents(state.events)
)
/*
action creators
 */
export const loadEventsRequest = () => ({
  type: LOAD_EVENTS_REQUEST
})

export function* getEventsSaga() {
  yield put({
    type: LOAD_EVENTS_START
  })

  try {
    let events = yield call(api.getEvents)
    yield put({
      type: LOAD_EVENTS_SUCCESS,
      payload: {
        events
      }
    })
  } catch (error) {
    yield put({
      type: LOAD_EVENTS_FAIL,
      payload: { error }
    })
  }
}

export function* saga() {
  yield takeEvery(LOAD_EVENTS_REQUEST, getEventsSaga)
}
