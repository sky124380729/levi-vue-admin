const apis: Record<string, any> = {}

const modules: Record<string, any> = import.meta.globEager('./modules/*.ts')

Object.keys(modules).forEach((key) => {
    const module = modules[key]
    Object.keys(module).forEach((key) => {
        const fn = module[key]
        if (apis.hasOwnProperty(key)) {
            console.warn(`已经存在key为${key}的接口名称`)
        } else {
            apis[key] = fn
        }
    })
})

export default apis
