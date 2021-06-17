import type { Plugin } from 'vite'

export default function i18n(): Plugin {
    return {
        name: 'vite:i18n',
        transform(code, id) {
            if (!/vue&type=i18n/.test(id)) return
            return `export default type => {
                type.i18n = ${code}
            }`
        }
    }
}
