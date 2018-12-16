import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(values, DataRecord) {
  return new OrderedMap(
    Object.entries(values).map(([id, value]) => [
      id,
      new DataRecord({ id, ...value })
    ])
  )
}
