import {Record, Map} from 'immutable'

import {appName} from '../config'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
const PersonRecord = Record({
    email: '',
    fname: '',
    lname: ''
})

export default function reducer(state = Map(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.set(payload.email, new PersonRecord(payload))

        default:
            return state
    }
}

/**
 * Action Creators
 * */
export function addPerson(email, fname, lname) {
    return (dispatch) =>
        dispatch({
            type: ADD_PERSON_SUCCESS,
            payload: { email, fname, lname }
        })
}