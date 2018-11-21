import {appName} from '../config'
import {Record} from 'immutable'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'person'
const prefix = `${appName}/${moduleName}`

export const NEW_PERSON_SUCCESS = `${prefix}/NEW_PERSON_SUCCESS`

/**
 * Reducer
 * */
const Person = Record({
    email: null,
    firstName: null,
    lastName: null
  });

export const ReducerRecord = Record({
    person: Person()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case NEW_PERSON_SUCCESS:
            return state.set('person', new Person(payload.person))
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
export function newPerson(person) {
    return (dispatch) => {
      dispatch({
        type: NEW_PERSON_SUCCESS,
        payload: {person}
      });
      dispatch(reset("newPerson"))
    };
}

