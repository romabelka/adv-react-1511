import {appName} from '../config'
import {Record} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const CONST_EXAMPLE = `${prefix}/CONST_EXAMPLE`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type} = action

    switch (type) {
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
