import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isClickOutside = ref<boolean>(false)
    const handler = (e: MouseEvent) => {
        if (elementRef.value) {
            if (elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isClickOutside
}

export default useClickOutside
