import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function objToImmutableMap(values, RecordModel) {
  return Object.entries(values).reduce(
    (acc, [id, value]) => acc.set(id, new RecordModel({ id, ...value })),
    new OrderedMap()
  )
}
