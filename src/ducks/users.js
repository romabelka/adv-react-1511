import {appName} from '../config'
import {List, Map} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerUsers = Map({
    users: List()
})

export default function reducer(state =  ReducerUsers, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_USER_SUCCESS:
            return state.update('users', users => users.push(payload))

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


export function addUser(firstName, lastName, email) {
    const newUserData = {firstName: firstName, lastName: lastName, email: email}
    return {
        type: ADD_USER_SUCCESS,
        payload: newUserData
    }
}
