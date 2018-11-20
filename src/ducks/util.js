import { OrderedMap } from 'immutable'

export function arrToImmutableMap(arr, RecordModel) {
    return arr.reduce((acc, item) => acc.set(item.id, RecordModel ? new RecordModel(item) : item), new OrderedMap())
}

export function randomId() {
    return (Date.now() + Math.random()).toString()
}