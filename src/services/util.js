import { OrderedMap, Map } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([id, value]) => [
    id,
    new RecordModel({ id, ...value })
  ]) //.set('id', id)]
}
