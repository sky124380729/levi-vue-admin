const stylesheet = document.querySelector('#rootVars')

export const getColorKeys = () => {
    const colors = Object.create(null)
    const style = stylesheet.innerHTML
    const colorsArr = style
        .replace(/\n/g, '')
        .replace(/:root\s*{(.+)}/g, '$1')
        .slice(0, -1)
        .split(';')
    colorsArr.forEach((item) => {
        const ret = item.split(':')
        let [key, value] = ret
        key = key.replace('--color-', '').trim()
        value = value.trim()
        colors[key] = value
    })
    return colors
}

export const replaceCssVars = (key, color) => {
    const reg = new RegExp(`--color-${key}\s?:(.+)\s?;`, 'g')
    stylesheet.innerHTML = stylesheet.innerHTML.replace(reg, function (match, p) {
        return match.replace(new RegExp(p, 'g'), color)
    })
}
