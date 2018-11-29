import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase'
import { fbToEntities } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
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

    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))

    case TOGGLE_SELECT:
      return state.update('selected', (selected) =>
        selected.has(payload.id)
          ? selected.remove(payload.id)
          : selected.add(payload.id)
      )

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
export const selectedIdsSelector = createSelector(
  stateSelector,
  (state) => state.selected
)
export const selectedEventsSelector = createSelector(
  eventListSelector,
  selectedIdsSelector,
  (entities, ids) => entities.filter((event) => ids.has(event.id))
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function toggleSelectEvent(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
  }
}

export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAllEvents)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST)

    const state = yield select(stateSelector)

    console.log('STATE', state.toJS())

    yield put({
      type: FETCH_LAZY_START
    })

    const lastItem = state.entities.last()

    const ref = firebase
      .database()
      .ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastItem ? lastItem.id : '')

    const data = yield call([ref, ref.once], 'value')

    console.log('DATA', data.val())

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    })
  }
}

export function* saga() {
  yield all([fetchLazySaga(), takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)])
}
