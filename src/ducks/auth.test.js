import { call, put, select } from 'redux-saga/effects'
import {
  signUp,
  signIn,
  signUpSaga,
  signInSaga,
  loadingSelector,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS
} from './auth'
import api from '../services/api'

describe('Auth Duck', () => {
  describe('Sign Up', () => {
    const user = {
      email: `test@tester.test`,
      password: 'helloWorld'
    }
    it('should sign-up user', () => {
      const { email, password } = user
      const action = signUp(email, password)
      const signUpUserProcess = signUpSaga(action)

      expect(signUpUserProcess.next().value).toEqual(select(loadingSelector))

      expect(signUpUserProcess.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )

      expect(signUpUserProcess.next().value).toEqual(
        call(api.signUp, email, password)
      )

      expect(signUpUserProcess.next(user).value).toEqual(
        put({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )

      expect(signUpUserProcess.next().done).toEqual(true)
    })
  })

  describe('Sign In', () => {
    const user = {
      email: `test@tester.test`,
      password: 'helloWorld'
    }
    it('should sign-up user', () => {
      const { email, password } = user
      const action = signIn(email, password)
      const signInUserProcess = signInSaga(action)

      expect(signInUserProcess.next().value).toEqual(
        call(api.signIn, email, password)
      )

      expect(signInUserProcess.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )

      expect(signInUserProcess.next().done).toEqual(true)
    })
  })
})
