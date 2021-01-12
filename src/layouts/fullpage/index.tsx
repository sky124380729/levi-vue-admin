import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'Fullpage',
    setup() {
        return () => {
            return <RouterView />
        }
    }
})
