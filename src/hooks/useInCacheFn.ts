import { nextTick, onActivated, onMounted } from 'vue'
const useInCacheFn = (hook: Fn) => {
    let mounted: boolean

    onMounted(() => {
        hook()
        nextTick(() => {
            mounted = true
        })
    })

    onActivated(() => {
        if (mounted) {
            hook()
        }
    })
}

export default useInCacheFn
