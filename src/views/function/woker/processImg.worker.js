onmessage = (e) => {
    const { imageData, tempData, imgType, greyLevel } = e.data
    const fn = self[`${imgType}Img`]
    const handelImageData = imgType === 'normal' ? imageData : fn(imageData, tempData, greyLevel)
    self.postMessage(handelImageData)
}

// 反转canvas.imgDate
self.reverseImg = function (imgData) {
    const { data: pixes, width, height } = imgData
    for (let i = 0; i < width * height; i++) {
        let r = pixes[i * 4 + 0]
        let g = pixes[i * 4 + 1]
        let b = pixes[i * 4 + 2]
        pixes[i * 4 + 0] = 255 - r
        pixes[i * 4 + 1] = 255 - g
        pixes[i * 4 + 2] = 255 - b
    }
    return imgData
}
// 高斯canvas.imgDate
self.gaussBlurImg = function (imgData, tempData) {
    const { data: pixes, width, height } = imgData
    let gaussMatrix = [],
        gaussSum = 0,
        x,
        y,
        r,
        g,
        b,
        a,
        i,
        j,
        k,
        len
    const radius = 20
    const sigma = 20
    a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
    b = -1 / (2 * sigma * sigma)
    for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x)
        gaussMatrix[i] = g
        gaussSum += g
    }
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum
    }
    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0
            gaussSum = 0
            for (j = -radius; j <= radius; j++) {
                k = x + j
                if (k >= 0 && k < width) {
                    i = (y * width + k) * 4
                    r += pixes[i] * gaussMatrix[j + radius]
                    g += pixes[i + 1] * gaussMatrix[j + radius]
                    b += pixes[i + 2] * gaussMatrix[j + radius]
                    gaussSum += gaussMatrix[j + radius]
                }
            }
            i = (y * width + x) * 4
            pixes[i] = r / gaussSum
            pixes[i + 1] = g / gaussSum
            pixes[i + 2] = b / gaussSum
        }
    }
    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0
            gaussSum = 0
            for (j = -radius; j <= radius; j++) {
                k = y + j
                if (k >= 0 && k < height) {
                    i = (k * width + x) * 4
                    r += pixes[i] * gaussMatrix[j + radius]
                    g += pixes[i + 1] * gaussMatrix[j + radius]
                    b += pixes[i + 2] * gaussMatrix[j + radius]
                    gaussSum += gaussMatrix[j + radius]
                }
            }
            i = (y * width + x) * 4
            pixes[i] = r / gaussSum
            pixes[i + 1] = g / gaussSum
            pixes[i + 2] = b / gaussSum
        }
    }

    // 反差保留
    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            const p = (i * width + j) * 4
            pixes[p + 0] = tempData[p + 0] - pixes[p + 0] + 255 / 2
            pixes[p + 1] = tempData[p + 1] - pixes[p + 1] + 255 / 2
            pixes[p + 2] = tempData[p + 2] - pixes[p + 2] + 255 / 2
        }
    }
    return imgData
}
// 灰度canvas.imgData
self.greyImg = function (imgData, _, greyLevel) {
    const { data: pixes, width, height } = imgData
    for (let i = 0; i < width * height; i++) {
        const r = pixes[i * 4 + 0]
        const g = pixes[i * 4 + 1]
        const b = pixes[i * 4 + 2]
        const grey = (r + g + b) / greyLevel
        pixes[i * 4 + 0] = grey
        pixes[i * 4 + 1] = grey
        pixes[i * 4 + 2] = grey
    }
    return imgData
}
