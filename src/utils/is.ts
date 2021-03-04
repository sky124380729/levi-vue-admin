/*
 * @Author: xwc
 * @Date: 2021-03-04 13:22:08
 * @LastEditTime: 2021-03-04 13:26:25
 * @LastEditors: yhy
 * @Description: 
 */
const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
    return is(val, 'String')
}

export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName
}

export function isUrl(path: string): boolean {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    return reg.test(path)
}
