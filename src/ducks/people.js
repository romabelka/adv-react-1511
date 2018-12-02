import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { call, put, takeEvery, all } from 'redux-saga/effects'
import { fbToEntities } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`
export const GET_PEOPLE_START = `${prefix}/GET_PEOPLE_START`
export const GET_PEOPLE_SUCCESS = `${prefix}/GET_PEOPLE_SUCCESS`

export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`

export const DELETE_PERSON = `${prefix}/DELETE_PERSON`
export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`

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
  entities: new OrderedMap(),
  loading: false
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_PEOPLE_START:
      return state.set('loading', true)
    case GET_PEOPLE_SUCCESS:
      return state
        .set('entities', fbToEntities(payload, PersonRecord))
        .set('loading', false)
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.set(payload.person.id, new PersonRecord(payload.person))
      )
    case DELETE_PERSON:
      return state.update('entities', (entities) =>
        entities.delete(payload.personId)
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

export const peopleSelector = createSelector(
  entitiesSelector,
  (entities) => entities.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id
export const personSelector = createSelector(
  peopleSelector,
  idSelector,
  (list, id) => list.find((person) => person.id === id)
)

/**
 * Action Creators
 * */

export function fetchPeople() {
  return {
    type: GET_PEOPLE_REQUEST
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function deletePerson({ id }) {
  console.log('deletePerson', id)
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { personId: id }
  }
}

/**
 * Sagas
 **/

export function* fetchPeopleSaga() {
  yield put({
    type: GET_PEOPLE_START
  })

  const data = yield call(api.fetchAllPeople)

  yield put({
    type: GET_PEOPLE_SUCCESS,
    payload: data || {}
  })
}

export function* addPersonSaga(action) {
  const { person } = action.payload

  const personId = yield call(api.addPerson)

  console.log('personId', personId)

  yield put({
    type: ADD_PERSON,
    payload: {
      person: { id: personId, ...person }
    }
  })

  yield put(reset('person'))
}

export function* deletePersonSaga(action) {
  const { personId } = action.payload

  yield call(api.deletePerson, personId)

  yield put({
    type: DELETE_PERSON,
    payload: {
      personId
    }
  })
}

export function* saga() {
  yield all([
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    yield takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga),
    yield takeEvery(GET_PEOPLE_REQUEST, fetchPeopleSaga)
  ])
}
