import { call, put, select } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { addPersonSaga, addPerson, ADD_PERSON } from './auth'
import api from '../services/api'
import {
  signIn,
  signInSaga,
  SIGN_IN_SUCCESS,
  signUp,
  signUpSaga,
  SIGN_UP_SUCCESS,
  SIGN_UP_START,
  loadingSelector
} from './auth'
import { generateId } from '../services/util'

describe('Events Duck', () => {
  it('should sign in', () => {
    const email = 'nicolai.voronin@gmail.com'
    const password = 'secret'

    const action = signIn(email, password)

    const addPersonProcess = signInSaga(action)

    expect(addPersonProcess.next().value).toEqual(
      call(api.signIn, email, password)
    )

    const response = { _id: 'personId', email }
    expect(addPersonProcess.next(response).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: {
          user: response
        }
      })
    )

    expect(addPersonProcess.next().done).toEqual(true)
  })

  it('should sign up', () => {
    const email = 'nicolai.voronin@gmail.com'
    const password = 'secret'

    const action = signUp(email, password)

    const addPersonProcess = signUpSaga(action)

    expect(addPersonProcess.next().value).toEqual(select(loadingSelector))

    expect(addPersonProcess.next(false).value).toEqual(
      put({ type: SIGN_UP_START })
    )

    expect(addPersonProcess.next().value).toEqual(
      call(api.signUp, email, password)
    )

    const response = { _id: 'personId', email }
    expect(addPersonProcess.next(response).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: {
          user: response
        }
      })
    )

    expect(addPersonProcess.next().done).toEqual(true)
  })

  it('should skip sign up', () => {
    const email = 'nicolai.voronin@gmail.com'
    const password = 'secret'

    const action = signUp(email, password)

    const addPersonProcess = signUpSaga(action)

    expect(addPersonProcess.next().value).toEqual(select(loadingSelector))

    expect(addPersonProcess.next(true).done).toEqual(true)
  })
})
