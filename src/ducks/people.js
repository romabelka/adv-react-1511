import { appName } from '../config'
import { Record } from 'immutable'
import { arrToImmutableMap, randomId } from './util'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const PersonRecord = Record({
    id: null,
    email: '',
    firstName: '',
    lastName: ''
})

export const ReducerRecord = Record({
    entities: arrToImmutableMap([], PersonRecord),
})

export default function reducer(people = new ReducerRecord(), action) {
    const {type, payload } = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return people.setIn(['entities', payload.person.id], new PersonRecord(payload.person))
        default:
            return people
    }
}

/**
 * Action Creators
 * */
export function addPerson(person) {
    return {
        type: ADD_PERSON_SUCCESS,
        payload: {
            person: {
                id: randomId(),
                ...person
            }
        }
    }
}
