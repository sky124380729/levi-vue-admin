<template>
    <div class="file-upload">
        <div class="file-upload-container" @click.prevent="triggerUpload">
            <slot v-if="fileStatus === 'loading'" name="loading">
                <button class="btn btn-primary" disabled>正在上传...</button>
            </slot>
            <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
                <button class="btn btn-primary" disabled>上传成功</button>
            </slot>
            <!-- <span v-else-if="fileStatus === 'error'">上传失败</span> -->
            <slot v-else name="default">
                <button class="btn btn-primary">点击上传</button>
            </slot>
        </div>
        <input ref="fileInput" class="file-input d-none" type="file" @change="handleFileChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
import axios from 'axios'
export default defineComponent({
    props: {
        action: {
            type: String,
            required: true
        },
        beforeUpload: {
            type: Function as PropType<CheckFunction>
        },
        uploaded: {
            type: Object
        }
    },
    emits: ['file-uploaded', 'file-uploaded-error'],
    setup(props, context) {
        const fileInput = ref<HTMLInputElement | null>(null)
        const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
        const uploadedData = ref(props.uploaded)
        const triggerUpload = () => {
            if (fileInput.value) {
                fileInput.value.click()
            }
        }
        const handleFileChange = (e: Event) => {
            const currentTarget = e.target as HTMLInputElement
            if (currentTarget.files) {
                const files = Array.from(currentTarget.files)
                if (props.beforeUpload) {
                    const result = props.beforeUpload(files[0])
                    if (!result) {
                        return
                    }
                }
                fileStatus.value = 'loading'
                const formData = new FormData()
                formData.append('file', files[0])
                axios
                    .post(props.action, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        fileStatus.value = 'success'
                        uploadedData.value = res.data
                        context.emit('file-uploaded', res.data)
                    })
                    .catch((error) => {
                        fileStatus.value = 'error'
                        context.emit('file-uploaded-error', { error })
                    })
                    .finally(() => {
                        if (fileInput.value) {
                            fileInput.value.value = ''
                        }
                    })
            }
        }
        return {
            fileInput,
            triggerUpload,
            fileStatus,
            handleFileChange,
            uploadedData
        }
    }
})
</script>

<style scoped></style>
