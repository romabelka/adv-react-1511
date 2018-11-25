import { put, call } from 'redux-saga/effects'
import {
  signInSaga,
  signIn,
  SIGN_IN_SUCCESS,
  signUpSaga,
  signUp,
  SIGN_UP_SUCCESS,
  SIGN_UP_START
} from './auth'
import api from '../services/api'

describe('Auth Duck', () => {
  it('should sign in user', () => {
    const user = {
      email: 'test@test.net',
      password: '12345678'
    }

    const action = signIn(user.email, user.password)

    const signInProcess = signInSaga(action)

    const fetchUser = call(api.signIn, user.email, user.password)

    expect(signInProcess.next().value).toEqual(fetchUser)

    expect(signInProcess.next().value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user: fetchUser.value }
      })
    )
    expect(signInProcess.next().done).toEqual(true)
  })

  it('should sign up user', () => {
    const user = {
      email: 'test2@test.net',
      password: '12345678'
    }

    const action = signUp(user.email, user.password)

    const signUpProcess = signUpSaga(action)

    signUpProcess.next()

    const fetchUser = call(api.signUp, user.email, user.password)

    expect(signUpProcess.next().value).toEqual(put({ type: SIGN_UP_START }))

    expect(signUpProcess.next().value).toEqual(fetchUser)

    expect(signUpProcess.next().value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user: fetchUser.value }
      })
    )
  })
})
