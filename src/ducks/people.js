import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { call, put, takeEvery, all } from 'redux-saga/effects'
import { generateId } from '../services/util'
import { mapToImmutableMap } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 * */

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

const ReducerState = Record({
  entities: new OrderedMap()
})

function createPersonRecord(data) {
  return new PersonRecord(data)
}

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_SUCCESS:
      return state.mergeIn(
        ['entities'],
        mapToImmutableMap(payload, createPersonRecord)
      )
    case ADD_PERSON_SUCCESS:
      return state.setIn(
        ['entities', payload.person.id],
        createPersonRecord(payload.person)
      )

    case DELETE_PERSON_SUCCESS:
      return state.removeIn(['entities', payload.id])

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleMapSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const peopleListSelector = createSelector(
  peopleMapSelector,
  (people) => people.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id
export const personSelector = createSelector(
  peopleMapSelector,
  idSelector,
  (people, id) => people.get(id)
)

/**
 * Action Creators
 * */

export function fetchAllPeople() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { id }
  }
}

/**
 * Sagas
 **/
export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAll, 'people')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data || []
  })
}

export function* addPersonSaga(action) {
  const { person } = action.payload

  const id = yield call(generateId)

  yield call(api.addPerson, id, person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: {
      person: { id, ...person }
    }
  })

  yield put(reset('person'))
}

export function* deletePersonSaga(action) {
  const { id } = action.payload

  yield call(api.delete, ['people', id])

  yield put({
    type: DELETE_PERSON_SUCCESS,
    payload: {
      id
    }
  })
}

export function* saga() {
  yield all([
    yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    yield takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
