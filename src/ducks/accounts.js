import {appName} from '../config'
import {Record, Set} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'accounts'
const prefix = `${appName}/${moduleName}`

export const ADD_ACCOUNT_SUCCESS = `${prefix}/ADD_ACCOUNT_SUCCESS`

/**
 * Reducer
 * */
export const AccountRecord = Record({
    email: null,
    password: null,
});

export default function reducer(state = new Set(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_ACCOUNT_SUCCESS:
            return state.add(payload)
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
export const addAccount = (email, password) => ({
    type: ADD_ACCOUNT_SUCCESS,
    payload: {
        email,
        password,
    }
})