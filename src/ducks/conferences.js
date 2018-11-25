import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import api from '../services/api'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'conferences'
const prefix = `${appName}/${moduleName}`
export const GET_CONFERENCES_REQUEST = `${prefix}/GET_CONFERENCES_REQUEST`
export const GET_CONFERENCES_SUCCESS = `${prefix}/GET_CONFERENCES_SUCCESS`
export const GET_CONFERENCES_FAIL = `${prefix}/GET_CONFERENCES_FAIL`

/**
 * Reducer
 * */
const ReducerState = Record({
  loading: false,
  error: '',
  entities: new List([])
})

// const ConferenceInfo = Record({
//     title: null,
//     url: null,
//     where: null,
//     when: null,
//     month: null,
//     submissionDeadline: null,
// })

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case GET_CONFERENCES_SUCCESS:
      let data = []
      Object.entries(payload.data).forEach(([key, value]) => {
        data.push({ id: key, ...value })
      })
      return state.set('entities', new List(data))

    case GET_CONFERENCES_FAIL:
      return state.set('error', error)

    default:
      return state
  }
}
/**
 * Selectors
 * */
export const loadingSelector = (state) => state[moduleName].loading
export const stateSelector = (state) => state[moduleName]
export const conferencesSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export function loadConferences() {
  return {
    type: GET_CONFERENCES_REQUEST,
    payload: {}
  }
}

/**
 * Sagas
 **/

export function* loadConferencesSaga(action, ...rest) {
  if (yield select(loadingSelector)) return

  try {
    yield call(api.get)
  } catch (error) {
    yield put({
      type: GET_CONFERENCES_FAIL,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(GET_CONFERENCES_REQUEST, loadConferencesSaga)
}
