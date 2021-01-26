import { computed, defineComponent, PropType, ref, unref } from 'vue'
import { Modal, Form, Row, Col } from 'ant-design-vue'

type Column = 1 | 2 | 3

export interface ModalFormType {
    visible: boolean
    loading: boolean
    rules: any
    form: any
}

export default defineComponent({
    name: 'Levi-ModalForm',
    inheritAttrs: false,
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        form: {
            required: true,
            type: Object
        },
        loading: {
            type: Boolean
        },
        column: {
            type: Number as PropType<Column>,
            default: 2
        }
    },
    emits: ['submit', 'update:visible', 'update:form'],
    setup(props, { emit, attrs, slots }) {
        const formRef = ref<any>(null)
        const visibleRef = ref(
            computed({
                get: () => props.visible,
                set: (val) => {
                    emit('update:visible', val)
                }
            })
        )
        const modelRef = ref(
            computed({
                get: () => props.form,
                set: (val) => {
                    emit('update:form', val)
                }
            })
        )
        const modalAfterClose = () => {
            formRef.value && formRef.value.clearValidate()
            modelRef.value = {}
        }
        const getModalAttrs = () => {
            const o = Object.create(null)
            const keys = ['title', 'width']
            keys.forEach((key) => {
                o[key] = attrs[key]
            })
            return o
        }
        const getFormAttrs = () => {
            const o = Object.create(null)
            const keys = ['rules']
            keys.forEach((key) => {
                o[key] = attrs[key]
            })
            return o
        }

        const onOk = () => {
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

        const renderFormItems = () => {
            const { column } = props
            if (slots && typeof slots.default === 'function') {
                return slots.default().map((col) => {
                    return <Col span={24 / column}>{col}</Col>
                })
            }
            return null
        }

        const widthRef = computed(() => {
            const { column } = props
            const map: any = {
                1: 480,
                2: 750,
                3: 980
            }
            return map[column]
        })
        return () => {
            const { loading } = props
            return (
                <div class='levi-modalForm'>
                    <Modal
                        {...getModalAttrs()}
                        confirmLoading={loading}
                        width={unref(widthRef)}
                        visible={unref(visibleRef)}
                        afterClose={modalAfterClose}
                        onOk={onOk}
                        onCancel={onCancel}
                    >
                        <Form
                            {...getFormAttrs()}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            labelAlign='right'
                            scrollToFirstError={true}
                            ref={formRef}
                            model={modelRef.value}
                        >
                            <Row>{renderFormItems()}</Row>
                        </Form>
                    </Modal>
                </div>
            )
        }
    }
})
