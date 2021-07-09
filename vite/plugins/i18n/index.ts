import type { Plugin } from 'vite'
import { parseVueRequest } from '/vt/utils'

export default function i18n(): Plugin {
    return {
        name: 'vite:i18n',
        transform(code, id) {
            const { query } = parseVueRequest(id)
            const { type } = query
            if (type !== 'i18n') return
            return `export default type => {
                type.i18n = ${code}
            }`
        }
    }
}
