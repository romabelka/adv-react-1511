import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'
import { call, put, takeEvery, select } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_START = `${prefix}/GET_EVENTS_START`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_FAIL = `${prefix}/GET_EVENTS_FAIL`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap(),
  error: null
})

const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case GET_EVENTS_SUCCESS:
      return state
        .update('entities', (entities) =>
          entities.merge(
            new OrderedMap(payload.events).map((value, key) =>
              EventRecord({ id: key, ...value })
            )
          )
        )
        .set('loading', false)
        .set('loaded', true)

    case GET_EVENTS_START:
      return state.set('loading', true)

    case GET_EVENTS_FAIL:
      return state.set('error', error).set('loading', false)

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
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventsSelector = createSelector(
  stateSelector,
  (state) => {
    return state.entities.valueSeq().toArray()
  }
)

/**
 * Action Creators
 * */

export function getEvents() {
  return {
    type: GET_EVENTS_REQUEST
  }
}

/**
 * Sagas
 **/

export function* getEventsSaga(action) {
  if (yield select(loadedSelector)) return
  if (yield select(loadingSelector)) return

  yield put({
    type: GET_EVENTS_START
  })

  try {
    const events = yield call(api.getEvents)

    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: {
        events
      }
    })
  } catch (error) {
    yield put({
      type: GET_EVENTS_FAIL,
      payload: {
        error
      }
    })
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga)
}
