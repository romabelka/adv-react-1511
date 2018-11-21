import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase/app'
import { push, replace } from 'connected-react-router'

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
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return state.set('user', payload.user)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const authUserSelector = (state) => state.auth.user

/**
 * Init logic
 */

firebase.auth().onAuthStateChanged((user) => {
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
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: { user }
                })
                
                dispatch(push('/admin'))
            })
}

export function signUp(email, password) {
    return (dispatch) =>
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: SIGN_UP_SUCCESS,
                payload: { user }
            }))
}