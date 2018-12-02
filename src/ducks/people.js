import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { call, put, takeEvery } from 'redux-saga/effects'
import { generateId } from '../services/util'
import { fbToEntities } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
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
  entities: new List([])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('entities', fbToEntities(payload, PersonRecord))

    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id

export const peopleInBasketSelector = (peopleIdInBasket = []) =>
  createSelector(
    peopleSelector,
    (people) =>
      people
        .filter((person) => peopleIdInBasket.includes(person.id))
        .map((person) => person.toJS())
  )

export const personSelector = createSelector(
  peopleSelector,
  idSelector,
  (list, id) => list.find((person) => person.id === id)
)

/**
 * Action Creators
 * */

export function fetchAllPeople() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function deletePerson(personId) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { personId }
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

/**
 * Sagas
 **/

export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAllPeople)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export function* deletePersonSaga(action) {
  yield call(api.deletePerson, action.payload.personId)

  yield call(fetchAllSaga)
}

export function* addPersonSaga(action) {
  const person = yield call(api.addPerson, action.payload.person)

  yield put(reset('person'))

  yield call(fetchAllSaga)
}

export function* saga() {
  yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  yield takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
}
