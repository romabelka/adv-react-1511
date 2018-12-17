export default class BasicStore {
    constructor(stores) {
        this._stores = stores
    }

    getStore(storeName) {
        return this._stores[storeName]
    }
}