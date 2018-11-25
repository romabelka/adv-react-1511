import api from '../services/api'
import {
  moduleName,
  loadingSelector,
  eventsSelector,
  getEventsSaga,
  LOAD_EVENTS_START,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAIL
} from './events'

import { call, put } from 'redux-saga/effects'

describe('selectors', () => {
  let state

  beforeEach(() => {
    state = {
      [moduleName]: {
        loading: false,
        events: {
          '1': {
            name: 'name1'
          },
          '2': {
            name: 'name2'
          }
        }
      }
    }
  })
  describe('isLoading selector', () => {
    it('returns true when loading', () => {
      state[moduleName].loading = true
      expect(loadingSelector(state)).toBe(true)
    })

    it('returns false when no user', () => {
      expect(loadingSelector(state)).toBe(false)
    })
  })

  describe('eventsSelector', () => {
    it('returns array of normalized event obj', () => {
      expect(eventsSelector(state)).toEqual([
        { id: '1', name: 'name1' },
        { id: '2', name: 'name2' }
      ])
    })
  })
})

describe('sagas', () => {
  let eventsProcess

  beforeEach(() => {
    eventsProcess = getEventsSaga()
  })

  it('when no errors - returns payload and emits events', () => {
    expect(eventsProcess.next().value).toEqual(put({ type: LOAD_EVENTS_START }))

    let events = { events: { id: 123 } }

    expect(eventsProcess.next().value).toEqual(call(api.getEvents))
    expect(eventsProcess.next(events).value).toEqual(
      put({
        type: LOAD_EVENTS_SUCCESS,
        payload: {
          events: events
        }
      })
    )

    expect(eventsProcess.next().done).toBe(true)
  })
  it('when error - emits error', () => {
    expect(eventsProcess.next().value).toEqual(put({ type: LOAD_EVENTS_START }))
    expect(eventsProcess.next().value).toEqual(call(api.getEvents))
    let error = new Error('err')

    expect(eventsProcess.throw(error).value).toEqual(
      put({
        type: LOAD_EVENTS_FAIL,
        error: error
      })
    )

    expect(eventsProcess.next().done).toBe(true)
  })
})
