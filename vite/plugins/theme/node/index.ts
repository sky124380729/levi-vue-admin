import type { Plugin } from 'vite'

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
const directRequestRE = /(\?|&)direct\b/
const isCSSRequest = (request: string): boolean => cssLangRE.test(request) && !directRequestRE.test(request)

export default function theme({ colors = {} }): Plugin {
    return {
        name: 'vite:theme',
        // enforce: 'post',
        transform(code, id) {
            if (!isCSSRequest(id)) return null
            Object.keys(colors).forEach((key) => {
                const value = colors[key]
                const reg = new RegExp(value, 'g')
                code = code.replace(reg, `var(--color-${key})`)
            })
            return code
        },
        transformIndexHtml(html) {
            const colorVars = Object.keys(colors).reduce((prev, key) => {
                const value = colors[key]
                prev += `--color-${key}: ${value};`
                prev += '\n'
                return prev
            }, '')
            const str = `:root { ${colorVars} }`
            return {
                html,
                tags: [{ tag: 'style', attrs: { id: 'rootVars' }, children: str, injectTo: 'head' }]
            }
        }
    }
}
