import api from '../services/api'
import {
  moduleName,
  isAuthorizedSelector,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_START,
  signIn,
  signUp,
  signInSaga,
  signUpSaga,
  loadingSelector,
  SIGN_UP_FAIL
} from './auth'
import { call, put, select } from 'redux-saga/effects'

describe('selectors', () => {
  let state

  beforeEach(() => {
    state = {
      [moduleName]: {
        loading: false,
        user: null
      }
    }
  })
  describe('isAuthorized selector', () => {
    it('returns true when user exists', () => {
      state[moduleName].user = { id: 1 }
      expect(isAuthorizedSelector(state)).toBe(true)
    })

    it('returns false when no user', () => {
      expect(isAuthorizedSelector(state)).toBe(false)
    })
  })

  describe('Loading selector', () => {
    it('true when isLoading: true', () => {
      state[moduleName].loading = true
      expect(loadingSelector(state)).toBe(true)
    })

    it('false when isLoading: false', () => {
      expect(loadingSelector(state)).toBe(false)
    })
  })
})

describe('Auth ducks', function() {
  describe('sign in saga', () => {
    it(`${SIGN_IN_SUCCESS} with a user as a payload`, () => {
      let email = 'test@test.com',
        password = 'password',
        action = signIn(email, password),
        signInProcess = signInSaga(action)

      expect(signInProcess.next().value).toEqual(
        call(api.signIn, email, password)
      )

      let user = { email, password }

      expect(signInProcess.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
    })
  })

  describe('sign up saga', () => {
    let signUpProcess,
      user = {
        email: 'test@test.com',
        password: 'password'
      }

    beforeEach(() => {
      let action = signUp(user.email, user.password)
      signUpProcess = signUpSaga(action)
    })

    describe('when LOADING state is falsy', () => {
      it(`signs up with a user`, () => {
        expect(signUpProcess.next().value).toEqual(select(loadingSelector))
        expect(signUpProcess.next(false).value).toEqual(
          put({ type: SIGN_UP_START })
        )
        expect(signUpProcess.next().value).toEqual(
          call(api.signUp, user.email, user.password)
        )
        expect(signUpProcess.next(user).value).toEqual(
          put({
            type: SIGN_UP_SUCCESS,
            payload: { user }
          })
        )
        expect(signUpProcess.next().done).toBe(true)
      })

      it(`emits ${SIGN_UP_FAIL} with error when error`, () => {
        signUpProcess.next()
        signUpProcess.next(false)
        signUpProcess.next()
        let error = new Error('err')

        expect(signUpProcess.throw(error).value).toEqual(
          put({
            type: SIGN_UP_FAIL,
            error: error
          })
        )
        expect(signUpProcess.next().done).toBe(true)
      })
    })

    it('returns when Loading is in progress', () => {
      signUpProcess.next()
      signUpProcess.next(true)
      expect(signUpProcess.next().done).toBe(true)
    })
  })
})
