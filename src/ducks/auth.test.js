import reducer, {
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  ReducerRecord,
  loadingSelector,
  SIGN_UP_START,
  SIGN_UP_FAIL,
  SIGN_IN_ERROR,
  SIGN_IN_LIMIT_REACHED,
  onAuthChangedSaga,
  createAuthStateChangedChannel
} from './auth'
import { call, put, select, take } from 'redux-saga/effects'
import api from '../services/api'
import { cloneableGenerator } from 'redux-saga/utils'

/**
 * Saga tests
 * */

describe('Auth sagas', () => {
  it('should sign up', () => {
    const authData = {
      email: 'lala@example.com',
      password: '12341234'
    }

    const user = {
      email: authData.email,
      uid: Math.random().toString()
    }

    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData
    }

    const saga = signUpSaga(requestAction)

    expect(saga.next().value).toEqual(select(loadingSelector))

    expect(saga.next(false).value).toEqual(put({ type: SIGN_UP_START }))

    expect(saga.next().value).toEqual(
      call(api.signUp, authData.email, authData.password)
    )

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })

  it('should not sign up while request is active', () => {
    const authData = {
      email: 'lala@example.com',
      password: '12341234'
    }

    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData
    }

    const saga = signUpSaga(requestAction)

    expect(saga.next().value).toEqual(select(loadingSelector))

    expect(saga.next(true).done).toBe(true)
  })

  it('should dispatch an error on sign up', () => {
    const authData = {
      email: 'lala@example.com',
      password: '12341234'
    }

    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData
    }

    const saga = signUpSaga(requestAction)

    expect(saga.next().value).toEqual(select(loadingSelector))

    expect(saga.next(false).value).toEqual(put({ type: SIGN_UP_START }))

    expect(saga.next().value).toEqual(
      call(api.signUp, authData.email, authData.password)
    )

    const error = new Error('some err')

    expect(saga.throw(error).value).toEqual(put({ type: SIGN_UP_FAIL, error }))
  })

  describe('signIn flow', () => {
    it('happy path', () => {
      const authData = {
        email: 'lala@example.com',
        password: '12341234'
      }

      const saga = signInSaga()

      saga.next()

      expect(saga.next(2).value).toEqual(take(SIGN_IN_REQUEST))

      const action = {
        payload: authData
      }

      expect(saga.next(action).value).toEqual(
        call(api.signIn, authData.email, authData.password)
      )

      const user = { name: 'John' }

      expect(saga.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )

      expect(saga.next().value).toBe(0)
    })

    it('sad path - limit reached', () => {
      const saga = cloneableGenerator(signInSaga)()

      saga.next()
      saga.next(2) // start from last valid iteration
      let error = { err: 'error' }
      saga.next({ payload: {} })

      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )

      expect(saga.next().value).toEqual(
        put({
          type: SIGN_IN_LIMIT_REACHED
        })
      )

      expect(saga.next().done).toEqual(false)
    })
  })

  describe('onAuthChangedSaga', () => {
    it('authenticates when chanel has {data} or throws {error}', () => {
      const process = cloneableGenerator(onAuthChangedSaga)()
      const data = { data: '123' }
      const error = { error: 'error' }

      expect(process.next().value).toEqual(call(createAuthStateChangedChannel))
      const channel = () => {}
      expect(process.next(channel).value).toEqual(take(channel))

      const clone = process.clone()

      expect(process.next(data).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user: data.data }
        })
      )

      expect(process.next().done).toEqual(false)

      expect(clone.next(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          payload: { error: error.error }
        })
      )

      expect(clone.next().done).toEqual(false)
    })
  })
})

/**
 * Reducer Tests
 * */

it('should sign in', () => {
  const state = new ReducerRecord()
  const user = {
    email: 'lala@example.com',
    uid: Math.random().toString()
  }

  const newState = reducer(state, {
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })

  expect(newState).toEqual(new ReducerRecord({ user }))
})
