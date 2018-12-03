import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedSet, OrderedMap } from 'immutable'
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

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap()
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
  peopleIds: []
})

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
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))
        .set('loaded', Object.keys(payload).length < 10)

    case TOGGLE_SELECT:
      return state.update('selected', (selected) =>
        selected.has(payload.id)
          ? selected.remove(payload.id)
          : selected.add(payload.id)
      )

    case ADD_PERSON_SUCCESS:
      return state.setIn(
        ['entities', payload.eventId, 'peopleIds'],
        payload.peopleIds
      )

    case DELETE_EVENT_REQUEST:
      return state.set('loading', true)

    case DELETE_EVENT_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['entities', payload.id])
        .update('selected', (selected) => selected.remove(payload.id))

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
  (entities) => entities.valueSeq().toArray()
)
export const selectedIdsSelector = createSelector(
  stateSelector,
  (state) => state.selected
)
export const selectedEventsSelector = createSelector(
  entitiesSelector,
  selectedIdsSelector,
  (entities, ids) => ids.toArray().map((id) => entities.get(id))
)

export const idSelector = (state, props) => props.id
export const eventSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, id) => entities.get(id)
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
    type: ADD_PERSON_REQUEST,
    payload: {
      personId,
      eventId
    }
  }
}

export function deleteEvent(id) {
  return {
    type: DELETE_EVENT_REQUEST,
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

export const deleteEventSaga = function*(action) {
  const { payload } = action

  try {
    yield call(api.deleteEvent, payload.id)

    yield put({
      type: DELETE_EVENT_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* addPersonToEventSaga({ payload: { eventId, personId } }) {
  const state = yield select(entitiesSelector)
  const peopleIds = state.getIn([eventId, 'peopleIds'])

  if (peopleIds.includes(personId)) return

  yield call(api.addPersonToEvent, eventId, peopleIds.concat(personId))

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { peopleIds, eventId }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga),
    takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga),
    takeEvery(ADD_PERSON_REQUEST, addPersonToEventSaga)
  ])
}
