import { List, Map } from 'immutable'

export function generateId() {
  return Date.now()
}

export function dataToEntities(data, RecordModel = Map) {
  return new List(
    Object.entries(data).map(
      ([uid, value]) => new RecordModel({ uid, ...value })
    )
  )
}
