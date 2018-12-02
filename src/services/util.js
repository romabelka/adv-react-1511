import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function mapToImmutableMap(values, creteFunction) {
  return Object.entries(values).reduce(
    (acc, [id, value]) => acc.set(id, creteFunction({ id, ...value })),
    new OrderedMap()
  )
}
