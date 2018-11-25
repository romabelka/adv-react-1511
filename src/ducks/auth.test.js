import { call, put, select } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUpSaga,
  signInSaga,
  signUp,
  signIn,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  loadingSelector
} from './auth'

describe('Auth Duck', () => {
  it('should sign up', () => {
    const email = 'test@test.com'
    const password = '123123'
    const saga = signUpSaga(signUp(email, password))
    const user = call(api.signUp, email, password)

    expect(saga.next().value).toEqual(select(loadingSelector))

    expect(saga.next().value).toEqual(put({ type: SIGN_UP_START }))

    expect(saga.next(email, password).value).toEqual(user)

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )

    expect(saga.next().done).toEqual(true)
  })

  it('should sign in', () => {
    const email = 'test@test.com'
    const password = '123123'
    const saga = signInSaga(signIn(email, password))
    const user = call(api.signIn, email, password)

    expect(saga.next().value).toEqual(user)

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )

    expect(saga.next().done).toEqual(true)
  })
})
