import path from 'path'
import fs from 'fs'
import type { Plugin, ResolvedConfig } from 'vite'
import { generate, presetPalettes } from '@ant-design/colors'
import { createFileHash } from '/vt/utils'
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
const directRequestRE = /(\?|&)direct\b/
const isCSSRequest = (request: string): boolean => cssLangRE.test(request) && !directRequestRE.test(request)

export const STYLESHEET_ID = '__LEVI_ANTD_THEME_COLORS__'
export const FILENAME = 'levi-antd-theme-colors'
export const CSS_VAR_PREFIX = '--antd-color'

export type ColorKey = 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta'

interface AntdThemeOptions {
    colors: Partial<Record<ColorKey, string>>
    dark?: boolean
    backgroundColor?: string
}
console.log(presetPalettes)
export default function theme(options: AntdThemeOptions): Plugin {
    let config: ResolvedConfig
    const cssOutputName = `${FILENAME}.${createFileHash()}.css`
    const getCss = () => {
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
                prev += `${CSS_VAR_PREFIX}-${key}-${index + 1}: ${color};`
                prev += `\n`
            })
            return prev
        }, '\n')
        return `:root { ${colorVars} }`
    }
    return {
        name: 'vite:antd-theme',
        // enforce: 'post',
        transform(code, id) {
            if (!isCSSRequest(id)) return null
            Object.keys(presetPalettes).forEach((key) => {
                const colors = presetPalettes[key]
                colors.forEach((color, index) => {
                    const reg = new RegExp(color, 'g')
                    code = code.replace(reg, `var(${CSS_VAR_PREFIX}-${key}-${index + 1})`)
                })
            })
            return code
        },
        configureServer(server) {
            return () => {
                server.middlewares.use((req, res, next) => {
                    const reg = new RegExp(FILENAME, 'g')
                    if (reg.test(req.url || '')) {
                        res.end(getCss())
                    } else {
                        next()
                    }
                })
            }
        },
        config: () => ({ server: { fs: { strict: false } } }),
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },
        async writeBundle() {
            const {
                root,
                build: { outDir, assetsDir }
            } = config
            const cssOutputPath = path.resolve(root, outDir, assetsDir, cssOutputName)
            fs.writeFileSync(cssOutputPath, getCss())
        },
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: 'link',
                        attrs: {
                            disabled: false,
                            id: STYLESHEET_ID,
                            rel: 'stylesheet',
                            href: path.posix.join(config.base, config.build.assetsDir, cssOutputName)
                        }
                        // injectTo: 'body-prepend'
                    }
                ]
            }
        }
    }
}
