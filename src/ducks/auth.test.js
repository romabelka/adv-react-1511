import { call, put, select } from 'redux-saga/effects'
import api from '../services/api'
import {
  signInSaga,
  signIn,
  signUpSaga,
  signUp,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  loadingSelector
} from './auth'

describe('Auth Duck', () => {
  it('should sign up', () => {
    const data = {
      email: 'obmok@mail.ru',
      password: 'Pwd12345'
    }

    const action = signUp(data.email, data.password)

    const saga = signUpSaga(action)

    expect(saga.next().value).toEqual(select(loadingSelector))

    expect(saga.next().value).toEqual(put({ type: SIGN_UP_START }))
    const user = call(api.signUp, data.email, data.password)

    expect(saga.next(data.email, data.password).value).toEqual(user)

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
    expect(saga.next().done).toEqual(true)
  })

  it('should sign in', () => {
    const data = {
      email: 'obmok@mail.ru',
      password: 'Pwd12345'
    }

    const action = signIn(data.email, data.password)

    const saga = signInSaga(action)

    const user = call(api.signIn, data.email, data.password)

    expect(saga.next().value).toEqual(user)

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_IN_SUCCESS, payload: { user } })
    )

    expect(saga.next().done).toEqual(true)
  })
})
