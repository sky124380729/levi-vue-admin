import { JsonParse, JsonStringify } from './index'

class Store {
    store: Storage
    constructor(key: 'localStorage' | 'sessionStorage') {
        if (key === 'localStorage') {
            this.store = window.localStorage
        } else {
            this.store = window.sessionStorage
        }
    }
    get(key: string) {
        return JsonParse(this.store.getItem(key))
    }
    set(key: string, val: any) {
        this.store.setItem(key, JsonStringify(val))
    }
    has(key: string) {
        return this.store.get(key) !== undefined
    }
    remove(key: string) {
        this.store.removeItem(key)
    }
    clear() {
        this.store.clear()
    }
    forEach(callback: (key: string, val: any) => void) {
        for (const key in this.store) {
            const val = this.store[key]
            callback(key, val)
        }
    }
}

const storage = {
    local: new Store('localStorage'),
    session: new Store('sessionStorage')
}

export default storage
