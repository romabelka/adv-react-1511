import { select, put, call } from 'redux-saga/effects'
import {
  signIn,
  signUpSaga,
  signUp,
  loadingSelector,
  SIGN_UP_SUCCESS,
  SIGN_UP_START,
  SIGN_UP_FAIL,
  signInSaga,
  SIGN_IN_SUCCESS
} from './auth'
import api from '../services/api'

describe('Auth duck', () => {
  describe('Sign up', () => {
    let signUpProcess
    let user

    beforeEach(() => {
      user = {
        email: 'test@example.com',
        password: 'qwerty123'
      }
      const action = signUp(user.email, user.password)
      signUpProcess = signUpSaga(action)
    })

    afterEach(() => {})

    it('should not register new user if loading = true', () => {
      expect(signUpProcess.next().value).toEqual(select(loadingSelector))

      const loading = true

      expect(signUpProcess.next(loading).done).toEqual(true)
    })

    it('should not register new user if auth.api rejects', () => {
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

      const apiError = 'apiError'
      expect(signUpProcess.throw(apiError).value).toEqual(
        put({
          type: SIGN_UP_FAIL,
          error: apiError
        })
      )
    })

    it('should register new user', () => {
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
  })

  describe('Sign in', () => {
    it('should sign in', () => {
      const user = {
        email: 'test@example.com',
        password: 'qwerty123'
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
})
