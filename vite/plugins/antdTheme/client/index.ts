import { generate } from '@ant-design/colors'
import type { ColorKey } from '../index'
import { CSS_VAR_PREFIX } from '../index'

export const replaceCssVars = (key: ColorKey, newColor: string) => {
    const domE = document.documentElement
    const colors = generate(newColor)
    colors.forEach((color, index) => {
        domE.style.setProperty(`${CSS_VAR_PREFIX}-${key}-${index + 1}`, color)
    })
}
