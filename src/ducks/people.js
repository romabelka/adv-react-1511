import {appName} from '../config'
import {Record, List, Map} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PEOPLE_SUCCESS = `${prefix}/ADD_PEOPLE_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    people: new List()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PEOPLE_SUCCESS:
            return state.update('people', people => people.push(new Map({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
            })))

        default:
            return state
    }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */
export function addPeople(email, firstName, lastName) {
    return dispatch => {
      dispatch({
          type: ADD_PEOPLE_SUCCESS,
          payload: { email, firstName, lastName }
      });
    }


}