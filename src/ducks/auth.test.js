import { call, put, select } from 'redux-saga/effects'
import {
  loadingSelector,
  SIGN_IN_SUCCESS,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  signIn,
  signInSaga,
  signUp,
  signUpSaga
} from './auth'
import { generateId } from '../services/util'
import api from '../services/api'

describe('Auth Duck', () => {
  const email = 'my@email.com'
  const password = 'password'
  it('should sign in', () => {
    const saga = signInSaga(signIn(email, password))
    const user = call(api.signIn, email, password)
    expect(saga.next().value).toEqual(user)
    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )
    expect(saga.next().done).toEqual(true)
  })
  it('should sign up', () => {
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
})
