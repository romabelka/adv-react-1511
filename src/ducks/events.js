import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedMap, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
import { fbToEntities, mapToImmutableMap } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const ADD_PERSON_TO_EVENT_REQUEST = `${prefix}/ADD_PERSON_TO_EVENT_REQUEST`
export const ADD_PERSON_TO_EVENT_SUCCESS = `${prefix}/ADD_PERSON_TO_EVENT_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap([])
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
  peopleIds: new OrderedSet([])
})

function createEventRecord(data) {
  const record = new EventRecord(data)
  return record.set(
    'peopleIds',
    new OrderedSet(Object.values(data.peopleIds || {}))
  )
}

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', mapToImmutableMap(payload, createEventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], mapToImmutableMap(payload, createEventRecord))
        .set('loaded', Object.keys(payload).length < 10)

    case TOGGLE_SELECT:
      return state.update('selected', (selected) =>
        selected.has(payload.id)
          ? selected.remove(payload.id)
          : selected.add(payload.id)
      )

    case ADD_PERSON_TO_EVENT_SUCCESS:
      return state.updateIn(['entities', payload.eventId, 'peopleIds'], (ids) =>
        ids.add(payload.personId)
      )

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const idSelector = (_, props) => props.id

export const entitiesMapSelector = createSelector(
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
  entitiesMapSelector,
  (entities) => entities.valueSeq().toArray()
)
export const peopleIdsByEntityIdSelector = createSelector(
  entitiesMapSelector,
  idSelector,
  (entities, id) => entities.get(id).peopleIds
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

export function addPersonToEvent(personId, eventId) {
  return {
    type: ADD_PERSON_TO_EVENT_REQUEST,
    payload: {
      personId,
      eventId
    }
  }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAll, 'events')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export const fetchLazySaga = function*() {
  const state = yield select(stateSelector)

  if (state.loading || state.loaded) return

  yield put({
    type: FETCH_LAZY_START
  })

  const lastEvent = state.entities.last()

  const data = yield call(api.fetchLazyEvents, lastEvent && lastEvent.id)

  yield put({
    type: FETCH_LAZY_SUCCESS,
    payload: data
  })
}

export const addPersonToEventSaga = function*({
  payload: { personId, eventId }
}) {
  const peopleIds = yield select(peopleIdsByEntityIdSelector, { id: eventId })

  if (!peopleIds.has(personId)) {
    yield call(api.addPersonToEvent, personId, eventId)
  }

  yield put({
    type: ADD_PERSON_TO_EVENT_SUCCESS,
    payload: {
      personId,
      eventId
    }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga),
    takeEvery(ADD_PERSON_TO_EVENT_REQUEST, addPersonToEventSaga)
  ])
}
