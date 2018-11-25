import { call, put, select } from 'redux-saga/effects'
import { reset } from 'redux-form'
import api from '../services/api'
import {
  signUp,
  signUpSaga,
  loadingSelector,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  signInSaga,
  signIn,
  SIGN_IN_SUCCESS
} from './auth'

describe('Auth Duck', () => {
  it('should sign up', () => {
    const email = '1@test.com'
    const password = 'testpassword'

    const user = {
      email
    }

    const action = signUp(email, password)

    const signUpProcess = signUpSaga(action)

    expect(signUpProcess.next().value).toEqual(select(loadingSelector))

    expect(signUpProcess.next().value).toEqual(
      put({
        type: SIGN_UP_START
      })
    )

    expect(signUpProcess.next().value).toEqual(
      call(api.signUp, email, password)
    )

    expect(signUpProcess.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    const error = new Error()
    expect(signUpProcess.throw(error).value).toEqual(
      put({
        type: SIGN_UP_FAIL,
        error
      })
    )

    expect(signUpProcess.next().done).toEqual(true)
  })

  it('should sign in', () => {
    const email = '1@test.com'
    const password = 'testpassword'

    const user = { email }

    const action = signIn(email, password)

    const signInProcess = signInSaga(action)

    expect(signInProcess.next().value).toEqual(
      call(api.signIn, email, password)
    )

    expect(signInProcess.next(user).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )

    expect(signInProcess.next().done).toEqual(true)
  })
})
