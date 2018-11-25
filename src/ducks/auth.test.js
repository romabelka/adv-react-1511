import {
  loadingSelector,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  signUp,
  signUpSaga
} from './auth'
import { generateId } from '../services/util'
import { call, put, select } from 'redux-saga/effects'
import api from '../services/api'

describe('Auth Duck', () => {
  it('should sign up person successfully', () => {
    const credentials = {
      email: 'someone@qa.qa',
      password: '12345678q'
    }

    const action = signUp(credentials)

    const signUpProcess = signUpSaga(action)

    expect(signUpProcess.next().value).toEqual(select(loadingSelector))

    expect(signUpProcess.next().value).toEqual(put({ type: SIGN_UP_START }))

    expect(signUpProcess.next().value).toEqual(
      call(api.signUp, credentials, undefined)
    )

    const user = undefined

    expect(signUpProcess.next().value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    expect(signUpProcess.next().done).toEqual(true)
  })
})
