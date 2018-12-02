import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedMap, OrderedSet } from 'immutable'
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

export const ADD_PERSON_TO_EVENT_REQUEST = `${prefix}/ADD_PERSON_TO_EVENT_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

export const CLEAN_EVENT_REQUEST = `${prefix}/CLEAN_EVENT_REQUEST`
export const CLEAN_EVENT = `${prefix}/CLEAN_EVENT`

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`
export const DELETE_EVENT = `${prefix}/DELETE_EVENT`

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

    case ADD_PERSON:
      return state.updateIn(['entities', payload.eventId, 'peopleIds'], (ids) =>
        ids.concat(payload.personId)
      )

    case CLEAN_EVENT:
      return state.updateIn(
        ['entities', payload.eventId, 'peopleIds'],
        (ids) => []
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
  (entities) => entities.valueSeq().toArray()
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
export const idSelector = (_, props) => props.id
export const eventSelector = createSelector(
  eventListSelector,
  idSelector,
  (entities, id) => entities.find((event) => event.id === id)
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
    payload: { personId, eventId }
  }
}

export function cleanEvent(eventId) {
  return {
    type: CLEAN_EVENT_REQUEST,
    payload: { eventId }
  }
}

export function deleteEvent(eventId) {
  console.log('deleteEvent', eventId)
  return {
    type: DELETE_EVENT_REQUEST,
    payload: { eventId }
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

  const data = yield call(api.fetchLazyEvents, lastEvent && lastEvent.get('id'))

  yield put({
    type: FETCH_LAZY_SUCCESS,
    payload: data
  })
}

export const addPersonToEventSaga = function*(action) {
  const {
    personId: { id: personId },
    eventId
  } = action.payload

  const selectedEvents = yield select(selectedEventsSelector)
  const selectedEvent = selectedEvents.find((event) => event.id === eventId)

  const alreadyAddedPeopleInToEvent = selectedEvent.get('peopleIds')
  const isPersonAlreadeAdded = alreadyAddedPeopleInToEvent.find(
    (addedPersonId) => addedPersonId === personId
  )

  if (isPersonAlreadeAdded) return

  const peopleIds = alreadyAddedPeopleInToEvent.concat(personId)
  yield call(api.addPersonToEvent, eventId, peopleIds)

  yield put({
    type: ADD_PERSON,
    payload: {
      personId,
      eventId
    }
  })
}

export const cleanEventSaga = function*(action) {
  const { eventId } = action.payload

  yield call(api.addPersonToEvent, eventId, [])

  yield put({
    type: CLEAN_EVENT,
    payload: {
      eventId
    }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga),
    takeEvery(ADD_PERSON_TO_EVENT_REQUEST, addPersonToEventSaga),
    takeEvery(CLEAN_EVENT_REQUEST, cleanEventSaga)
  ])
}
