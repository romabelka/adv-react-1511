import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
import { fbToEntities, sleep } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_NEXT_SUCCESS = `${prefix}/FETCH_NEXT_SUCCESS`
export const FETCH_NEXT_START = `${prefix}/FETCH_NEXT_START`
export const FETCH_NEXT_FAIL = `${prefix}/FETCH_NEXT_FAIL`
export const FETCH_NEXT_REQUEST = `${prefix}/FETCH_NEXT_REQUEST`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new List([]),
  loadedEntities: new List([])
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

    case FETCH_NEXT_START:
      let { from, to } = payload
      let data = state
        .get('entities')
        .filter((i, index) => from <= index && index <= to)

      return state.update('loadedEntities', (loadedEntities) => {
        data = data.filter(
          (item) => !loadedEntities.some((loaded) => loaded.id === item.id)
        )
        return loadedEntities.concat(data)
      })

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

export const loadedEntitiesSelector = createSelector(
  stateSelector,
  (state) => state.loadedEntities.toArray()
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

export function fetchNextEvents({ startIndex, stopIndex, callback }) {
  return {
    type: FETCH_NEXT_REQUEST,
    payload: {
      from: startIndex,
      to: stopIndex,
      callback: callback
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

export function* fetchNextSaga({ payload: { from, to, callback } }) {
  yield call(sleep, 3 * 1000)

  yield put({
    type: FETCH_NEXT_START,
    payload: { from, to }
  })

  let entities = yield select(loadedEntitiesSelector)

  yield put({
    type: FETCH_NEXT_SUCCESS,
    payload: { events: entities }
  })

  yield call(callback)
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_NEXT_REQUEST, fetchNextSaga)
  ])
}
