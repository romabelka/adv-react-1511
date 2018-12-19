export function entitiesFromFB(data) {
    Object.entries(data).forEach(([key, value]) => value.id = key)
    return data
}