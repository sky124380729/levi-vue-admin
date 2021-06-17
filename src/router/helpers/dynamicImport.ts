export default function dynamicImport(component: string) {
    const dynamicViewsModules = import.meta.glob('../../views/**/*index.{vue,tsx}')
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace('../../views', '')
        return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
    })
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0]
        return dynamicViewsModules[matchKey]
    }
    if (matchKeys?.length === 0) {
        console.warn('Only files with index name can be imported dynamically!!!')
        return
    }
    return null
}
