import { watchEffect } from 'vue'
import { debounce, ownAddEventListener } from '/@/utils'

// when window seize change, call the fn

const useWinResize = (fn: Fn, timeout = 300): void => {
    watchEffect((onInvalidate) => {
        const resizeEvent = ownAddEventListener(window, 'resize', debounce(fn, timeout))
        onInvalidate(() => {
            resizeEvent()
        })
    })
}

export default useWinResize
