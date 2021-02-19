import { isNumber, isString } from './is'

// 深拷贝
export function deepClone<T extends { hasOwnProperty: any }>(obj: T): T {
    if (!obj) return obj
    const result = (Array.isArray(obj) ? [] : {}) as any
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepClone(obj[key]) // 递归复制
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}

// 深度合并
export function deepMerge<T = any>(src: any, target: any): T {
    let key: string
    for (key in target) {
        src[key] = src[key] && src[key].toString() === '[object Object]' ? deepMerge(src[key], target[key]) : (src[key] = target[key])
    }
    return src
}

// 对象数组根据某个字段去重
export function filterUniqueByKey<T, K extends keyof T>(arr: T[], key: K): T[] {
    const o = Object.create(null)
    return arr.reduce((prev: T[], curr: T) => {
        const value = curr[key]
        if (o[value] === void 0) {
            o[value] = true
            prev.push(curr)
        }
        return prev
    }, [])
}

// 每一帧移动距离公式 = 每一帧时间 * 每一帧的速度
export function ft(deltaTime: number, distance: number, duration = 300) {
    return deltaTime * (distance / duration)
}

// 延迟函数
export function debounce(fn: (...args: unknown[]) => unknown, timeout = 300) {
    let timer: TimeoutHandle
    return function (this: Window, ...args: unknown[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, timeout)
    }
}

// 柯里化
export function curry(fn: Fn) {
    return function curried(...args: any[]) {
        if (args.length < fn.length) {
            return function (...innerArgs: any[]) {
                return curried(...args.concat(innerArgs))
            }
        }
        return fn(...args)
    }
}

// 组合函数
export function flowRight(...fns: Fn[]) {
    return function (value: any) {
        while (fns.length) {
            const fn = fns.pop()
            value = fn!(value)
        }
        return value
    }
}

// 事件绑定
export const ownAddEventListener = (scope: Window | HTMLElement, type: string, handler: any, capture = false) => {
    scope.addEventListener(type, handler, capture)
    return () => {
        scope.removeEventListener(type, handler, capture)
    }
}

// 千分位
export const thousands = (num: any): string => {
    return isString(num) || isNumber(num) ? (+num).toLocaleString() : ''
}

// 分钟转天数和小时
export const formatMins = (minutes: number | string) => {
    isString(minutes) && (minutes = +minutes)
    const days = Math.floor(minutes / 24 / 60)
    const hours = Math.floor((minutes % 1440) / 60)
    const mins = minutes % 60
    return `${days ? days + 'd' : ''}${hours ? hours + 'h' : ''}${mins + 'm'}`
}
