import { all, takeEvery, put, call } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { firebaseToItems } from '../services/util'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new List([])
})
export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_START:
      return state.set('loading', true)
    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', firebaseToItems(payload, EventRecord))
    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(
  entitiesSelector,
  (entities) => entities.toArray()
)

/**
 * Action Creators
 * */
export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

/**
 * Sagas
 * */
export function* fetchAllSaga() {
  const ref = firebase.database().ref('events')
  yield put({
    type: FETCH_ALL_START
  })
  const snapshot = yield call([ref, ref.once], 'value')
  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)])
}
