import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { call, put, takeEvery } from 'redux-saga/effects'
import { objToImmutableMap } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS = `${prefix}/GET_EVENTS`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
/**
 * Reducer
 * */
const ReducerState = Record({
  loading: false,
  entities: new List([])
})

const EventRecord = Record({
  id: null,
  name: null,
  date: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS:
      return state.set('loading', true)

    case GET_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('entities', objToImmutableMap(payload.events, EventRecord))

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]

export const loadingSelector = createSelector(
  stateSelector,
  (state) => {
    return state.loading
  }
)
export const eventsSelector = createSelector(
  stateSelector,
  (state) => {
    return state ? state.entities.valueSeq().toArray() : []
  }
)

/**
 * Action Creators
 * */

export function getEvents() {
  return {
    type: GET_EVENTS
  }
}

/**
 * Sagas
 **/

export function* getEventsSaga(action) {
  try {
    const events = yield call(api.getEvents)

    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: { events: events.toJSON() }
    })
  } catch (err) {
    throw err
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS, getEventsSaga)
}
