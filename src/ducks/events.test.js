import { put, call, select } from 'redux-saga/effects'
import {
  fetchNextSaga,
  FETCH_NEXT_START,
  fetchNextEvents,
  FETCH_NEXT_SUCCESS,
  FETCH_NEXT_FAIL,
  loadedEntitiesSelector
} from './events'

describe('event sagas', () => {
  it('should fetch next events', () => {
    let cb = () => {}
    let action = fetchNextEvents({
      startIndex: 10,
      stopIndex: 20,
      callback: cb
    })

    let fetchEventsProcess = fetchNextSaga(action)

    // sleep call - ignore it as it's for test
    fetchEventsProcess.next()

    expect(fetchEventsProcess.next().value).toEqual(
      put({
        type: FETCH_NEXT_START,
        payload: {
          from: 10,
          to: 20
        }
      })
    )

    let events = [1, 2]
    expect(fetchEventsProcess.next().value).toEqual(
      select(loadedEntitiesSelector)
    )

    expect(fetchEventsProcess.next(events).value).toEqual(
      put({
        type: FETCH_NEXT_SUCCESS,
        payload: { events: events }
      })
    )

    expect(fetchEventsProcess.next().value).toEqual(call(cb))

    expect(fetchEventsProcess.next().done).toBe(true)
  })
})
