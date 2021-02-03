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
