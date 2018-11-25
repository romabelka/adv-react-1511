import { appName } from '../config'
import firebase from 'firebase/app'
import { firebaseToItems } from './utils'

import { all, put, call, takeEvery } from 'redux-saga/effects'

import { Record, List } from 'immutable'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_START = `${prefix}/FETCH_EVENTS_START`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  items: new List([]),
  loading: false
})

export const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_EVENTS_START:
      return state.set('loading', true)

    case FETCH_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('items', firebaseToItems(payload, EventRecord))

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]

export const itemsSelector = createSelector(
  stateSelector,
  (state) => state.items
)

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

export const eventListSelector = createSelector(
  itemsSelector,
  (items) => items.toArray()
)

/**
 * Action Creators
 * */
export function fetchEvents() {
  return {
    type: FETCH_EVENTS_REQUEST
  }
}

/**
 * Sagas
 * */
export function* saga() {
  yield all([takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)])
}

export function* fetchEventsSaga() {
  const eventsRef = firebase.database().ref('events')
  yield put({
    type: FETCH_EVENTS_START
  })

  const data = yield call([eventsRef, eventsRef.once], 'value')
  yield put({
    type: FETCH_EVENTS_SUCCESS,
    payload: data.val()
  })
}
