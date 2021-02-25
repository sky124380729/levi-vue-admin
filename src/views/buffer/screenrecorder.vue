<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-auto">
                <a-card title="屏幕录制">
                    <div class="card-body">
                        <div class="row">
                            <div>
                                <div class="record_voice_askbox">
                                    <label for="audio" class="record_voice_askbox_label">是否录制声音</label>
                                    <a-input id="audio" v-model="checked" type="checkbox" class="record_voice_checkbox_merge" :disabled="isStart && !isFinish" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl">
                                <div class="card">
                                    <video ref="video" src width="600" height="400" class="video_dom_style"></video>
                                </div>
                            </div>
                        </div>
                        <a-row>
                            <a-button type="primary" :disabled="isStart" class="action_btn_style" @click="onStartBtn">开始录制</a-button>
                            <a-button type="danger" :disabled="!isStart" class="action_btn_style" @click="onEndBtn">结束录制</a-button>
                            <a-button type="primary" :disabled="!isFinish" class="action_btn_style" @click="onDownloadBtn">下载录制结果</a-button>
                        </a-row>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as pageSpec from './screenrecorder'
import { defineComponent, ref, onMounted, reactive, toRefs, Ref } from 'vue'
export default defineComponent({
    name: 'buffer-screenrecorder',
    setup() {
        let options = reactive<pageSpec.mediaOptions>({
            mediaRecorder: null,
            data: [],
            stream: null,
            checked: false,
            isStart: false,
            isFinish: false
        })

        const video: Ref<HTMLMediaElement | null> = ref(null)

        onMounted(() => {})

        const onStartBtn = async () => {
            options.isStart = true
            options.isFinish = false
            const mediaDev = navigator.mediaDevices as any

            options.stream = await mediaDev.getDisplayMedia({
                video: true,
                audio: options.checked
            })
            options.mediaRecorder = new MediaRecorder(options.stream, {
                mimeType: 'video/webm'
            })
            if (options.mediaRecorder) {
                options.mediaRecorder.ondataavailable = (e: pageSpec.mediaData) => {
                    options.data.push(e.data)
                }
                options.mediaRecorder.start()
                if (video.value) {
                    video.value.srcObject = options.stream
                    video.value.play()
                }
            }
        }

        const onEndBtn = () => {
            options.isStart = false
            options.isFinish = true
            if (video.value && options.mediaRecorder) {
                video.value?.pause()
                options.mediaRecorder.pause()
                options.mediaRecorder.stop()
                options.stream.getTracks().forEach((track: { stop: () => void }) => {
                    track.stop()
                })
            }
        }

        const onDownloadBtn = () => {
            // let res = new Blob(this.data, { type: 'video/webm' })
            let res = new Blob(options.data, { type: 'video/mp4' })
            console.log(res)
            let url = URL.createObjectURL(res)
            let a = document.createElement('a')
            a.href = url
            a.download = `${new Date().getTime()}.mp4`
            a.click()
            a.remove()
        }

        return {
            video,
            onStartBtn,
            onEndBtn,
            onDownloadBtn,
            ...toRefs(options)
        }
    }
})
</script>

<style scoped>
.row {
    margin-bottom: 10px;
}
.record_voice_checkbox_merge {
    width: 20px;
    position: relative;
    top: 1px;
}
.action_btn_style {
    margin-right: 30px;
}
.record_voice_askbox_label {
    font-size: 16px;
}
.video_dom_style {
    background-color: #eee;
    border: 4px solid;
    border-radius: 6px;
}
</style>
