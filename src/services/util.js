import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(values, DataRecord) {
  return Object.entries(values).reduce(
    (acc, [id, value]) => acc.set(id, new DataRecord({ id, ...value })),
    new OrderedMap()
  )
}
