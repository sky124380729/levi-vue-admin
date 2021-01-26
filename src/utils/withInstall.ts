import type { App } from 'vue'

const withInstall = (...components: any[]) => {
    components.forEach((comp) => {
        comp.install = (app: App) => {
            app.component(comp.displayName || comp.name, comp)
        }
    })
}

export default withInstall
