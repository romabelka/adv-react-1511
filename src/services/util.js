import { List } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(originMap, values, DataRecord) {
  Object.entries(values).forEach(([id, value]) => {
    let record = new DataRecord({ id, ...value })
    originMap = originMap.set(id, record)
  })

  return originMap
}

export function fbPeopleToEntities(values, DataRecord) {
  return new List(
    Object.entries(values).map(([id, value]) => {
      return new DataRecord({
        id: id,
        ...value
      })
    })
  )
}
