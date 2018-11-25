import { select, put, call } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUp,
  signUpSaga,
  loadingSelector,
  SIGN_UP_SUCCESS,
  SIGN_UP_START,
  signIn,
  signInSaga,
  SIGN_IN_SUCCESS
} from './auth'

describe('Auth Duck', () => {
  it('should Sign Up', () => {
    const user = {
      email: 'roman@test.com',
      password: '123qwe123'
    }
    const action = signUp(user.email, user.password)
    const signUpProcess = signUpSaga(action)

    expect(signUpProcess.next().value).toEqual(select(loadingSelector))

    const loading = false
    const { email, password } = user

    expect(signUpProcess.next(loading).value).toEqual(
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

    expect(signUpProcess.next().done).toEqual(true)
  })

  it('should Sign In', () => {
    const user = {
      email: 'test@test.com',
      password: '123qwe123'
    }
    const { email, password } = user
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
