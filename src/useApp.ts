import type { App } from 'vue'

let app: App

export function setApp(_app: App): void {
    app = _app
}

export function getApp(): App {
    return app
}
