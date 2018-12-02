import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(objectFromFb, DataRecord) {
  for (let key in objectFromFb) {
    objectFromFb[key].id = key
  }
  return Object.values(objectFromFb).reduce((acc, item) => {
    return acc.set(item.id, DataRecord ? new DataRecord(item) : item)
  }, new OrderedMap())
}
