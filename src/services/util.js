import { List } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(values, DataRecord) {
  return new List(
    Object.entries(values).map(
      ([id, value]) => new DataRecord({ id, ...value })
    )
  )
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}
