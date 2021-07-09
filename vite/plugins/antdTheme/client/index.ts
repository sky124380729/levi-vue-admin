import { generate } from '@ant-design/colors'
import { STYLESHEET_ID } from '../index'
import type { ColorKey } from '../index'

export const replaceCssVars = (key: ColorKey, newColor: string) => {
    const stylesheet = document.getElementById(STYLESHEET_ID)
    if (!stylesheet) return
    const colors = generate(newColor)
    colors.forEach((color, index) => {
        const reg = new RegExp(`--color-${key}-${index + 1}\s?:(.+)\s?;`, 'g')
        stylesheet.innerHTML = stylesheet.innerHTML.replace(reg, function (match, p) {
            return match.replace(new RegExp(p, 'g'), color)
        })
    })
}
