import { DirectiveBinding } from 'vue'
import store from '/@/store'

export default {
    directiveName: 'permission',
    mounted(el: any, binding: DirectiveBinding) {
        const { instance, value } = binding
        const instanceName = instance?.$options.name
        const fullName = instanceName + '-' + value
        const {
            state: { accessBtns }
        } = store
        if (accessBtns.indexOf(fullName) === -1) {
            el.parentNode.removeChild(el)
        }
    }
}
