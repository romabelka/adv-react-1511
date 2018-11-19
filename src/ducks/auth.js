import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase/app'
import {all, call, put, take, takeEvery} from 'redux-saga/effects'
import {reset} from 'redux-form'
import {eventChannel} from 'redux-saga'
import {push} from 'react-router-redux'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

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

/**
 * Init logic
 */


/**
 * Action Creators
 * */

export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {email, password}
    }
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password}
    }
}

export const signUpSaga = function * () {
    const auth = firebase.auth()

    while (true) {
        const action = yield take(SIGN_UP_REQUEST)

        try {
            const user = yield call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.email, action.payload.password
            )
            yield put({
                type: SIGN_UP_SUCCESS,
                payload: {user}
            })

            yield put(reset('auth'))
            yield put(push('/admin'))

        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            })
        }
    }
}

export const signInSaga = function * () {
    const auth = firebase.auth()

    while (true) {
        const action = yield take(SIGN_IN_REQUEST)

        try {
            yield call(
                [auth, auth.signInWithEmailAndPassword],
                action.payload.email, action.payload.password
            )

            yield put(push('/admin'))

        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                error
            })
        }
    }
}

const createAuthChannel = () => eventChannel(emit => {
    return firebase.auth().onAuthStateChanged(user => emit({ user }))
})


export const watchStatusChange = function * () {
    const chan = yield call(createAuthChannel)

    while (true) {
        const { user } = yield take(chan)

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
        } else {
            yield put(push('/auth/sign-in'))
        }
    }
}


export const saga = function * () {
    yield all([
        signUpSaga(),
        signInSaga(),
        // takeEvery(SIGN_UP_REQUEST, signUpSaga),
        // takeEvery(SIGN_IN_REQUEST, signInSaga),
        watchStatusChange(),
    ])
}
