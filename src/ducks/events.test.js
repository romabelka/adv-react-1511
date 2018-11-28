import { put, call } from 'redux-saga/effects'
import api from '../services/api'
import {
  fetchNextSaga,
  FETCH_NEXT_START,
  fetchNextEvents,
  FETCH_NEXT_SUCCESS,
  FETCH_NEXT_FAIL
} from './events'

describe('event sagas', () => {
  it('should fetch next events', () => {
    let fetchEventsProcess = fetchNextSaga(fetchNextEvents('123', 11))

    expect(fetchEventsProcess.next().value).toEqual(
      put({
        type: FETCH_NEXT_START
      })
    )

    expect(fetchEventsProcess.next().value).toEqual(
      call(api.fetchEvents, 11, '123')
    )

    let events = [1, 2]
    expect(fetchEventsProcess.next(events).value).toEqual(
      put({
        type: FETCH_NEXT_SUCCESS,
        payload: { events }
      })
    )

    expect(fetchEventsProcess.next().done).toBe(true)
  })

  it('should put error when fetching fails', () => {
    let fetchEventsProcess = fetchNextSaga(fetchNextEvents('123'))

    // fetch start
    fetchEventsProcess.next()

    // api call
    fetchEventsProcess.next()

    let error = 'err'
    expect(fetchEventsProcess.throw(error).value).toEqual(
      put({
        type: FETCH_NEXT_FAIL,
        error
      })
    )

    expect(fetchEventsProcess.next().done).toBe(true)
  })
})
