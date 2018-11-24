import { OrderedMap, Record } from 'immutable'
import { all, select, put, takeEvery, call } from 'redux-saga/effects'
import api from '../services/api'

import { appName } from '../config'
import { objToImmutableMap } from '../services/util'
import { createSelector } from 'reselect'

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
  loaded: false,
  loading: false,
  entities: new OrderedMap(),
  error: null
})

const EventRecord = Record({
  id: '',
  month: '',
  submissionDeadline: '',
  title: '',
  url: '',
  when: '',
  where: ''
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action
  switch (type) {
    case LOAD_EVENTS_START:
      return state.set('loading', true).set('loaded', false)
    case LOAD_EVENTS_FAIL:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', error)
    case LOAD_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('error', false)
        .set('entities', objToImmutableMap(payload.events, EventRecord))
    default:
      return state
  }
}

/**
 * Selectors
 * */
const stateSelector = (state) => state[moduleName]
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const errorSelector = createSelector(
  stateSelector,
  (state) => state.error
)
export const eventsSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

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
export function* loadEventsSaga() {
  if (yield select(loadingSelector)) return

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
