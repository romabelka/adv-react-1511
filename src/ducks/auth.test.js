import { call, put, select } from 'redux-saga/effects'
import api from '../services/api'
import {
  signInSaga,
  signUpSaga,
  signIn,
  signUp,
  loadingSelector,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from './auth'

describe('Auth Duck', () => {
  it('should signIn', () => {
    const email = 'test@test.com'
    const password = '12345678'
    const userMock = 'user data'
    const action = signIn(email, password)
    const signInUserProcess = signInSaga(action)

    expect(signInUserProcess.next().value).toEqual(
      call(api.signIn, email, password)
    )

    expect(signInUserProcess.next(userMock).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user: userMock }
      })
    )

    expect(signInUserProcess.next().done).toEqual(true)
  })

  describe('should signUp', () => {
    it('successful case', () => {
      const email = 'test@test.com'
      const password = '12345678'
      const userMock = 'user data'
      const action = signUp(email, password)
      const signUpUserProcess = signUpSaga(action)

      expect(signUpUserProcess.next(email, password).value).toEqual(
        select(loadingSelector)
      )

      expect(signUpUserProcess.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )

      expect(signUpUserProcess.next(email, password).value).toEqual(
        call(api.signUp, email, password)
      )

      expect(signUpUserProcess.next(userMock).value).toEqual(
        put({
          type: SIGN_UP_SUCCESS,
          payload: { user: userMock }
        })
      )

      expect(signUpUserProcess.next().done).toEqual(true)
    })

    it('error case', () => {
      const email = 'test@test.com'
      const password = '12345678'
      const userMock = 'user data'
      const action = signUp(email, password)
      const signUpUserProcess = signUpSaga(action)

      expect(signUpUserProcess.next(email, password).value).toEqual(
        select(loadingSelector)
      )

      expect(signUpUserProcess.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )

      signUpUserProcess.next()
      expect(signUpUserProcess.throw('error').value).toEqual(
        put({
          type: SIGN_UP_FAIL,
          error: 'error'
        })
      )

      expect(signUpUserProcess.next().done).toEqual(true)
    })
  })
})
