import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'

/**
 * Constants
 * */

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const PEOPLE_ADDED = `${prefix}/PEOPLE_ADDED`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  list: new OrderedMap({}),
})

const PeopleReacord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case PEOPLE_ADDED:
      return state.setIn(['list', payload.id], new PeopleReacord(payload))

    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Init logic
 */

/**
 * Action Creators
 * */

export const createPeople = data => ({
  type: PEOPLE_ADDED,
  payload: { ...data, id: `${Date.now() + Math.random()}` },
})
