import { generate } from '@ant-design/colors'
import { STYLESHEET_ID } from '../index'

type ColorKey = 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta'

export const replaceCssVars = (key: ColorKey, newColor: string) => {
    const stylesheet = document.getElementById(STYLESHEET_ID)
    if (!stylesheet) return
    const colors = generate(newColor)
    colors.forEach((color, index) => {
        const reg = new RegExp(`--color-${key}-${index}\s?:(.+)\s?;`, 'g')
        stylesheet.innerHTML = stylesheet.innerHTML.replace(reg, function (match, p) {
            console.log(match, p)
            return match.replace(new RegExp(p, 'g'), color)
        })
    })
}
