import {appName} from '../config'
import {reset} from 'redux-form'

export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER = `${prefix}/CREATE_USER`
export const REMOVE_USER = `${prefix}/REMOVE_USER`

export default function reducer(state = [], action) {
    const {type, payload} = action

    switch (type) {
        case CREATE_USER:
            const user = {...payload.user};
            return state.concat(user);
        case REMOVE_USER:
            const users = [...state];
            users.splice(state.findIndex(u => u.id === payload), 1);
            return users;
        default:
            return state
    }
}

export function createUser({firstName, lastName, email}) {
    const user = {id: Date.now(), firstName, lastName, email};
    return (dispatch) => {
        dispatch(reset('user'));
        dispatch({
            type: CREATE_USER,
            payload: { user }
        })
    }
}

export function removeUser(id) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_USER,
            payload: id
        })
    }
}
