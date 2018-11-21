import { OrderedMap } from 'immutable'

export function arrToMap(arr, DataRecord) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, DataRecord ? new DataRecord(item) : item),
    new OrderedMap()
  )
}
