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
export const BATCH_SIZE = 10

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_MORE_REQUEST = `${prefix}/FETCH_MORE_REQUEST`
export const FETCH_MORE_START = `${prefix}/FETCH_MORE_START`
export const FETCH_MORE_SUCCESS = `${prefix}/FETCH_MORE_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loadedAll: false,
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
    case FETCH_MORE_START:
      return state.set('loading', true)

    case FETCH_MORE_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('loadedAll', Object.keys(payload).length < BATCH_SIZE)
        .set(
          'entities',
          state.entities.concat(fbToEntities(payload, EventRecord))
        )
    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('loadedAll', true)
        .set('entities', fbToEntities(payload, EventRecord))

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
export const loadedAllSelector = createSelector(
  stateSelector,
  (state) => state.loadedAll
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

export function fetchMoreEvents(startAt = '') {
  return {
    type: FETCH_MORE_REQUEST,
    payload: {
      startAt
    }
  }
}

export function toggleSelectEvent(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
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

export function* fetchMoreSaga({ payload: { startAt } }) {
  if (yield select(loadedAllSelector)) {
    return
  }
  if (yield select(loadingSelector)) {
    return
  }
  yield put({
    type: FETCH_MORE_START
  })

  const data = yield call(api.fetchEventsBatch, startAt, BATCH_SIZE)

  yield put({
    type: FETCH_MORE_SUCCESS,
    payload: data
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_MORE_REQUEST, fetchMoreSaga)
  ])
}
