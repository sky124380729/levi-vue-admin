const useDebounce = (fn: (...args: unknown[]) => unknown, wait = 300) => {
    let timer: number | undefined
    return function (this: Window, ...args: unknown[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
export default useDebounce
