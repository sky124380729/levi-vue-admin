import { defineComponent, onUnmounted, PropType, ref, watch } from 'vue'

import { FILE_URL } from '/@/config'
import { Icon } from '/@/components'

import './index.less'

// type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

type CheckFunction = (file: File) => boolean

import { upload } from '/@/apis/modules/common'

export default defineComponent({
    name: 'LvUpload',
    props: {
        value: {
            type: [String, Array]
        },
        action: {
            type: String as PropType<string>,
            default: FILE_URL
        },
        beforeUpload: {
            type: Function as PropType<CheckFunction>
        }
    },
    emits: ['update:value'],
    setup(props, { emit, slots }) {
        const fileList = ref<File[]>([])
        const fileInputRef = ref<Nullable<HTMLInputElement>>(null)
        const handleClick = (e: MouseEvent) => {
            e.preventDefault()
            if (fileInputRef.value) {
                fileInputRef.value.click()
            }
        }
        watch(
            () => props.value,
            (val) => {
                console.log(val)
            }
        )
        /* const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            }) */
        const handleFileChange = (e: Event) => {
            // console.log(e)
            const currentTarget = e.target as HTMLInputElement
            if (currentTarget.files) {
                const files = Array.from(currentTarget.files)
                if (props.beforeUpload) {
                    const result = props.beforeUpload(files[0])
                    if (!result) return
                }
                const formData = new FormData()
                formData.append('files', files[0])
                upload(formData).then((res: ResponseData<string>) => {
                    if (res) {
                        fileList.value.push(files[0])
                        emit('update:value', res.data[0])
                    }
                    // 上传之后清空
                    if (fileInputRef.value) {
                        fileInputRef.value.value = ''
                    }
                })
            }
        }
        // const renderSlots = () => {
        //     if (slots.default) {
        //         return slots
        //     } else {
        //         return (
        //             <div class='levi-upload__box'>
        //                 <Icon icon='ion:add-outline' size='40' />
        //             </div>
        //         )
        //     }
        // }
        const remove = (index: number) => {
            fileList.value.splice(index, 1)
        }

        onUnmounted(() => {
            console.log('asdsd')
        })
        return () => {
            return (
                <div class='levi-upload'>
                    <div class='levi-upload__container' onClick={handleClick}>
                        {slots}
                    </div>
                    <ul class='levi-upload__fileList'>
                        {fileList.value.map((file: File, index: number) => (
                            <li class='levi-upload__file' key={index}>
                                <div class='file__info'>
                                    <Icon class='file-type' size='18' color='#409EFF' icon='mdi:file-document-outline' />
                                    <span class='file-name'>{file.name}</span>
                                </div>
                                <div class='file__action'>
                                    <Icon
                                        onClick={() => {
                                            remove(index)
                                        }}
                                        class='file-delete'
                                        size='18'
                                        color='#F56C6C'
                                        icon='ic:baseline-delete-forever'
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <input ref={fileInputRef} class='levi-upload__input' onChange={handleFileChange} style='display:none;' type='file' />
                </div>
            )
        }
    }
})
