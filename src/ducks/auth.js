import {appName} from '../config'
import {Record} from 'immutable'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../api'
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
try{
    onAuthStateChanged(
        (user) => {
            console.log('call user', user)
            window.store.dispatch({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
        }
    )
} catch(err){

}

/**
 * Action Creators
 * */
export function signIn(email, password) {
    return (dispatch) =>
        signInWithEmailAndPassword(email, password)
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
        createUserWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: SIGN_UP_SUCCESS,
                payload: { user }
            }))
}