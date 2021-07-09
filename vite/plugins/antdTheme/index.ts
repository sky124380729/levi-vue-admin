import type { Plugin } from 'vite'
import { generate, presetPalettes } from '@ant-design/colors'
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
const directRequestRE = /(\?|&)direct\b/
const isCSSRequest = (request: string): boolean => cssLangRE.test(request) && !directRequestRE.test(request)

export const STYLESHEET_ID = 'levi-root-vars'

export type ColorKey = 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta'

interface AntdThemeOptions {
    colors: Partial<Record<ColorKey, string>>
    dark?: boolean
    backgroundColor?: string
}

export default function theme(options: AntdThemeOptions): Plugin {
    return {
        name: 'vite:antd-theme',
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
            const { colors: defaultColors, dark = false, backgroundColor } = options
            const colorVars = Object.keys(presetPalettes).reduce((prev: string, key: string) => {
                const colors = Reflect.has(defaultColors, key)
                    ? // @ts-ignore
                      generate(defaultColors[key], {
                          theme: dark ? 'dark' : 'default',
                          backgroundColor
                      })
                    : presetPalettes[key]

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
