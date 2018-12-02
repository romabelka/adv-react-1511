import { List, OrderedMap } from 'immutable'

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

export function fbMapToImmutableMap(values, RecordModel) {
  return Object.entries(values).reduce(
    (acc, [id, value]) => acc.set(id, new RecordModel({ id, ...value })),
    new OrderedMap()
  )
}
