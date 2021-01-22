// for vue
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare namespace JSX {
    // interface ElementAttributesProperty {
    //     $props: any
    // }
    // interface IntrinsicElements {
    //     [elem: string]: any
    // }

    // avoid JSX 绑定自定义事件报错
    interface IntrinsicAttributes {
        [elem: string]: any
    }
}

// for tsx
declare const React: string
