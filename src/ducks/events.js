import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
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
export const TOTAL_COUNT = `${prefix}/TOTAL_COUNT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new List([]),
  totalCount: 0
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
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .update('entities', (entities) =>
          entities.merge(fbToEntities(payload, EventRecord))
        )

    case TOTAL_COUNT:
      return state.set('totalCount', payload)

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
export const totalCountSelector = (state) => state[moduleName].totalCount

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

export function fetchLazyEvents() {
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

  const data = yield call(api.fetchEvents)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export function* fetchTotalCountSaga() {
  const totalCount = yield call(api.fetchCount)

  yield put({
    type: TOTAL_COUNT,
    payload: totalCount
  })
}

export function* fetchLazySaga() {
  if (yield select(loadingSelector)) return

  if (yield select(loadedSelector)) return

  yield put({
    type: FETCH_LAZY_START
  })

  const entities = yield select(entitiesSelector)
  const lastID = entities.last()

  const data = yield call(api.fetchEvents, lastID ? lastID.id : '')

  yield put({
    type: FETCH_LAZY_SUCCESS,
    payload: data
  })
}

export function* saga() {
  yield all([
    fetchTotalCountSaga(),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga)
  ])
}
