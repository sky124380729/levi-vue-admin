import { computed, defineComponent, PropType, ref, unref } from 'vue'
import { Modal } from 'ant-design-vue'
import Form, { ColumnType } from '../Form'

export default defineComponent({
    name: 'LvModalForm',
    inheritAttrs: false,
    props: {
        width: {
            type: [String, Number] as PropType<string | number>
        },
        labelWidth: {
            type: [Number, String] as PropType<number | string>,
            default: 110
        },
        wrapperWidth: {
            type: [Number, String] as PropType<number | string>,
            default: 0
        },
        title: {
            type: String as PropType<string>,
            default: '未定义'
        },
        visible: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        loading: {
            type: Boolean as PropType<boolean>
        },
        form: {
            type: Object as PropType<Recordable>,
            default: () => ({})
        }
    },
    emits: ['submit', 'update:visible', 'update:form'],
    setup(props, { emit, attrs }) {
        // AForm Ref
        let formRef = ref<any>(null)

        const getFormRef = (ref: any) => {
            formRef = ref
        }
        // visible
        const visibleRef = computed<boolean>({
            get: () => props.visible,
            set: (val) => {
                emit('update:visible', val)
            }
        })

        // model
        const modelRef = computed<any>({
            get: () => props.form,
            set: (val) => {
                emit('update:form', val)
            }
        })

        const modalAfterClose = () => {
            formRef.value && formRef.value.clearValidate()
            modelRef.value = {}
        }

        const onOk = () => {
            if (!formRef.value) return
            formRef.value
                .validate()
                .then(() => {
                    emit('submit')
                })
                .catch(() => null)
        }

        const onCancel = () => {
            visibleRef.value = false
        }

        // dynamic wrapper width
        const wrapperWidthRef = computed(() => {
            const { wrapperWidth } = props
            const { column = 2 } = attrs
            if (wrapperWidth) {
                return wrapperWidth
            }
            const columnWidthMap: Record<ColumnType, number> = {
                1: 400,
                2: 240,
                3: 200,
                4: 180
            }
            return columnWidthMap[column as ColumnType]
        })

        // if width is not set,make width realte to form,we use default form wrapper width
        const widthRef = computed(() => {
            const { width } = props
            if (width) return width
            const { column = 2 } = attrs
            const { labelWidth } = props
            // modal padding is 24px
            const MODAL_PADDING = 20
            // file padding is 15px
            const FIELD_PADDING = 15
            // computed width
            return (parseInt(labelWidth) + parseInt(wrapperWidthRef.value) + FIELD_PADDING) * (column as ColumnType) + MODAL_PADDING * 2
        })

        return () => {
            const { title, loading, labelWidth } = props
            return (
                <div class='levi-modalForm'>
                    <Modal title={title} confirmLoading={loading} width={unref(widthRef)} visible={unref(visibleRef)} afterClose={modalAfterClose} onOk={onOk} onCancel={onCancel}>
                        <Form {...attrs} labelWidth={labelWidth} onGetFormRef={getFormRef} modelValue={unref(modelRef)}></Form>
                    </Modal>
                </div>
            )
        }
    }
})
