import type { Plugin } from 'vite'

export default function theme(): Plugin {
    return {
        name: 'vite:antd-dark-theme',
        transform(code, id) {
            if (/antd\.dark\.css$/.test(id)) {
                const matches = [...code.matchAll(/.+?\{.+?\}/gs)].map((match) => match[0])
                const colorRE = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})|rgba?\((.*),\s*(.*),\s*(.*)(?:,\s*(.*(?:.*)?))?\)/gi
                const result = matches.reduce((prev: string[], str: string) => {
                    if (colorRE.test(str)) {
                        const line = str.split(/\n/).reduce((arr: string[], c: string) => {
                            if (/\{/.test(c)) {
                                arr.push(`[data-theme="dark"] ${c}`)
                            } else if (colorRE.test(c) || /\}/.test(c)) {
                                arr.push(c)
                            }
                            return arr
                        }, [])
                        prev.push(line.join('\n'))
                    }
                    return prev
                }, [])
                return result.join('\n')
            }
            return code
        }
    }
}
