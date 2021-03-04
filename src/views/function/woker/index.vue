<template>
    <div class="workder">
        <a-spin :spinning="spinning">
            <canvas ref="canvas"></canvas>
        </a-spin>
        <a-row>
            <a-radio-group v-model:value="handleType" button-style="solid">
                <a-radio-button value="normal">正常</a-radio-button>
                <a-radio-button value="reverse">反转</a-radio-button>
                <a-radio-button value="gaussBlur">高斯差</a-radio-button>
                <a-radio-button value="grey">灰度</a-radio-button>
            </a-radio-group>
        </a-row>
        <a-row v-if="handleType === 'grey'">
            <a-slider v-model:value="greyLevel" :min="1" :max="20" />
        </a-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Worker from './processImg.worker?worker'
import imageUrl from '/imgs/bg.png?url'
type ImageType = 'normal' | 'reverse' | 'gaussBlur' | 'grey'
export default defineComponent({
    name: 'function-woker',
    setup() {
        // base
        const canvas = ref<Nullable<HTMLCanvasElement>>(null)

        const spinning = ref<boolean>(false)

        const greyLevel = ref<number>(1)

        const handleType = ref<ImageType>('normal')

        const worker = new Worker()

        const w = 960
        const h = 600

        let offsetCtx: CanvasRenderingContext2D

        const createOffsetCanvas = () => {
            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            const img = new Image()
            img.src = imageUrl
            img.onload = () => {
                ctx?.drawImage(img, 0, 0, w, h)
            }
            ctx && (offsetCtx = ctx)
        }

        const render = () => {
            if (!canvas.value) return
            canvas.value.width = w
            canvas.value.height = h
            const ctx = canvas.value.getContext('2d')
            const img = new Image()
            img.src = imageUrl
            img.onload = () => {
                ctx?.drawImage(img, 0, 0, w, h)
            }
            watch([() => handleType.value, () => greyLevel.value], ([imgType, greyLevel]) => {
                console.log(imgType, greyLevel)
                const imageData = offsetCtx.getImageData(0, 0, w, h)
                const tempData = offsetCtx.getImageData(0, 0, w, h).data
                spinning.value = true
                worker.postMessage({ imageData, tempData, imgType, greyLevel })
                worker.onmessage = (e) => {
                    ctx?.clearRect(0, 0, w, h)
                    ctx?.putImageData(e.data, 0, 0, 0, 0, w, h)
                    spinning.value = false
                }
            })
        }

        onMounted(() => {
            render()
            createOffsetCanvas()
        })
        return {
            canvas,
            spinning,
            greyLevel,
            handleType
        }
    }
})
</script>

<style lang="less" scoped>
.workder {
    background-color: #e3ecf7;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .ant-slider {
        width: 200px;
    }
}
</style>
