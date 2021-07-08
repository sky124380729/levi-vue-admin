import type { Plugin } from 'vite'
import { presetPalettes } from '@ant-design/colors'

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
const directRequestRE = /(\?|&)direct\b/
const isCSSRequest = (request: string): boolean => cssLangRE.test(request) && !directRequestRE.test(request)

export const STYLESHEET_ID = 'levi-root-vars'

export default function theme(options = {}): Plugin {
    console.log(options)
    return {
        name: 'vite:theme',
        // enforce: 'post',
        transform(code, id) {
            if (!isCSSRequest(id)) return null
            Object.keys(presetPalettes).forEach((key) => {
                const colors = presetPalettes[key]
                colors.forEach((color, index) => {
                    const reg = new RegExp(color, 'g')
                    code = code.replace(reg, `var(--color-${key}-${index})`)
                })
            })
            return code
        },
        transformIndexHtml(html) {
            const colorVars = Object.keys(presetPalettes).reduce((prev, key) => {
                const colors = presetPalettes[key]
                colors.forEach((color, index) => {
                    prev += `--color-${key}-${index}: ${color};`
                    prev += `\n`
                })
                return prev
            }, '\n')
            const str = `:root { ${colorVars} }`
            return {
                html,
                tags: [{ tag: 'style', attrs: { id: STYLESHEET_ID, type: 'text/css' }, children: str, injectTo: 'head' }]
            }
        }
    }
}
