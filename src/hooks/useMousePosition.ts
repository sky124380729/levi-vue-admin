import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

function useMousePosition() {
    const pos = reactive({
        x: 0,
        y: 0
    })
    const updateMouse = (e: MouseEvent) => {
        pos.x = e.pageX
        pos.y = e.pageY
    }
    onMounted(() => {
        document.addEventListener('click', updateMouse)
    })
    onUnmounted(() => {
        document.removeEventListener('click', updateMouse)
    })
    return toRefs(pos)
}

export default useMousePosition
