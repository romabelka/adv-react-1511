import { List } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function firebaseToItems(values, DataRecord) {
  return new List(
    Object.entries(values).map(
      ([id, value]) => new DataRecord({ id, ...value })
    )
  )
}
