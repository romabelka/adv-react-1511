import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import api from '../services/api'

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
const ReducerState = Record({
  loading: false,
  error: '',
  entities: new OrderedMap()
})

const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

const objToMap = (value) =>
  Object.entries(value).reduce(
    (acc, [id, value]) => acc.set(id, new EventRecord({ id, ...value })),
    new OrderedMap()
  )

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case EVENTS_START:
      return state.set('loading', true)
    case EVENTS_SUCCESS:
      return state.set('entities', objToMap(payload)).set('loading', false)

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
export const getEventsData = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export const fetchEvents = () => {
  return {
    type: EVENTS_REQUEST
  }
}

/**
 * Sagas
 **/

export function* fetchEventSaga() {
  if (yield select(loadingSelector)) return

  yield put({
    type: EVENTS_START,
    payload: 'start'
  })

  try {
    const events = yield call(api.fetchEvents)

    yield put({
      type: EVENTS_SUCCESS,
      payload: events
    })
  } catch (error) {
    yield put({
      type: EVENTS_FAIL,
      payload: error
    })
  }
}

export function* saga() {
  yield takeEvery(EVENTS_REQUEST, fetchEventSaga)
}
