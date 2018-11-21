import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase/app'
import { arrToMap } from './utils'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */
const UserRecord = Record({
    id: null,
    email: null,
    firstname: null,
    lastname: null
  })

export const ReducerRecord = Record({
    users: arrToMap([], UserRecord)
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, randomId} = action

    switch (type) {
        case ADD_USER_SUCCESS:
        return state.setIn(['users', randomId], new UserRecord({id: randomId,...payload.user}))

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
export function addUser(user) {
    return ( dispatch ) => {
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: { user },
            generateId: true
        })

        dispatch(reset('addUser'))
    }
}



