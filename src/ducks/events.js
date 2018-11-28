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

export const FETCH_EVENTS_COUNT_REQUEST = `${prefix}/FETCH_EVENTS_COUNT_REQUEST`
export const FETCH_EVENTS_COUNT_START = `${prefix}/FETCH_EVENTS_COUNT_START`
export const FETCH_EVENTS_COUNT_SUCCESS = `${prefix}/FETCH_EVENTS_COUNT_SUCCESS`

export const FETCH_EVENTS_LAZY_REQUEST = `${prefix}/FETCH_EVENTS_LAZY_REQUEST`
export const FETCH_EVENTS_LAZY_START = `${prefix}/FETCH_EVENTS_LAZY_START`
export const FETCH_EVENTS_LAZY_SUCCESS = `${prefix}/FETCH_EVENTS_LAZY_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  isCountLoading: false,
  areEventsLoading: false,
  selected: new OrderedSet([]),
  entities: new List([]),
  eventsCount: 0,
  userMaxScrollIndex: 0
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
    case FETCH_EVENTS_COUNT_START:
      return state.set('isCountLoading', true)
    case FETCH_EVENTS_COUNT_SUCCESS:
      return state
        .set('isCountLoading', false)
        .set('eventsCount', payload.eventsCount)

    case FETCH_EVENTS_LAZY_REQUEST:
      return state.set('userMaxScrollIndex', payload.userMaxScrollIndex)
    case FETCH_EVENTS_LAZY_START:
      return state.set('areEventsLoading', true)
    case FETCH_EVENTS_LAZY_SUCCESS:
      return state
        .set('areEventsLoading', false)
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
export const countLoadingSelector = createSelector(
  stateSelector,
  (state) => state.isCountLoading
)
export const areEventsLoadingSelector = createSelector(
  stateSelector,
  (state) => state.areEventsLoading
)
export const eventsCountSelector = createSelector(
  stateSelector,
  (state) => state.eventsCount
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
  (entities, ids) => {
    return entities.filter((event) => {
      return ids.has(event.id)
    })
  }
)

/**
 * Action Creators
 * */
export function fetchEventsCount() {
  return {
    type: FETCH_EVENTS_COUNT_REQUEST
  }
}

export function fetchLazy(userMaxScrollIndex) {
  return {
    type: FETCH_EVENTS_LAZY_REQUEST,
    payload: {
      userMaxScrollIndex
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

export function* fetchEventsCountSaga() {
  yield put({
    type: FETCH_EVENTS_COUNT_START
  })

  const eventsCount = yield call(api.fetchEventsCount)

  yield put({
    type: FETCH_EVENTS_COUNT_SUCCESS,
    payload: {
      eventsCount
    }
  })
}

export function* fetchLazySaga() {
  const state = yield select(stateSelector)

  if (state.areEventsLoading) return

  yield put({
    type: FETCH_EVENTS_LAZY_START
  })

  const lastEvents = state.entities.last()
  const events = yield call(api.fetchEvents, lastEvents && lastEvents.id)

  if (lastEvents) {
    delete events[lastEvents.id]
  }

  yield put({
    type: FETCH_EVENTS_LAZY_SUCCESS,
    payload: events
  })

  if (state.userMaxScrollIndex > state.entities.size) {
    yield fetchLazySaga()
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_EVENTS_COUNT_REQUEST, fetchEventsCountSaga),
    takeEvery(FETCH_EVENTS_LAZY_REQUEST, fetchLazySaga)
  ])
}
