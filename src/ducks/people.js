import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { call, put, takeEvery } from 'redux-saga/effects'
import { generateId } from '../services/util'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
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
  entities: new List([
    new PersonRecord({
      id: 1,
      firstName: 'Roma',
      lastName: 'Yakobchuk',
      email: 'qwer@awsd.com'
    }),
    new PersonRecord({
      id: 2,
      firstName: 'Ilya',
      lastName: 'Kantor',
      email: 'qwer@aksdfhg.com'
    })
  ])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )

    case DELETE_PERSON_REQUEST:
      return state.update('entities', (entities) =>
        entities.filter((e) => e.id !== payload.personId)
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.toArray()
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

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function deletePerson(personId) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: {
      personId
    }
  }
}

/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  const { person } = action.payload

  const id = yield call(generateId)

  yield put({
    type: ADD_PERSON,
    payload: {
      person: { id, ...person }
    }
  })

  yield put(reset('person'))
}

export function* saga() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}
