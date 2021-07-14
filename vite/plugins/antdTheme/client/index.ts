import { generate } from '@ant-design/colors'
import type { ColorKey } from '../index'

export const replaceCssVars = (key: ColorKey, newColor: string) => {
    const domE = document.documentElement
    const colors = generate(newColor)
    colors.forEach((color, index) => {
        domE.style.setProperty(`--color-${key}-${index + 1}`, color)
    })
}
