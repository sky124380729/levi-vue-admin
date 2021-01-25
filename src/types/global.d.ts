declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
}

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare interface Pagination<T> {
    current: number
    query?: T
    size: number
}

declare interface Res<T> {
    code: number
    data: T
    message: string
    success: boolean
}
