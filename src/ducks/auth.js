import {appName} from '../config'
import {Record} from 'immutable'

import { auth } from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    email: '',
    token: ''
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return state
                .set('email', payload.user.email)
                .set('token', payload.user.refreshToken)

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

auth.init((user) => {
    window.store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
})

/**
 * Action Creators
 * */
export function signIn(email, password) {
    return (dispatch) =>
        auth.signIn(email, password)
            .then(user => dispatch({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            }))
}

export function signUp(email, password) {
    return (dispatch) =>
        auth.signUp(email, password)
            .then(user => dispatch({
                type: SIGN_UP_SUCCESS,
                payload: { user }
            }))
}