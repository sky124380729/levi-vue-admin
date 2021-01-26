import { computed, defineComponent, PropType, ref, unref, VNode } from 'vue'
import { Modal, Form, Row, Col } from 'ant-design-vue'

type Column = 1 | 2 | 3

type AttrType = 'modal' | 'form'
interface AttrModel {
    modal: Record<string, any>
    form: Record<string, any>
}

export interface ModalFormType {
    visible: boolean
    loading: boolean
    rules: any
    form: any
}

export default defineComponent({
    name: 'LvModalForm',
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

        const getAttrs = (type: AttrType) => {
            const o: AttrModel = {
                modal: {},
                form: {}
            }
            const modalKeys = ['title', 'width']
            const formKeys = ['rules']
            modalKeys.forEach((key) => {
                o.modal[key] = attrs[key]
            })
            formKeys.forEach((key) => {
                o.form[key] = attrs[key]
            })
            return o[type]
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

        // 根据name获取default slots里面的vmode
        const getChildNodesByName = (name: string, vnodes: VNode[], results: VNode[] = []) => {
            vnodes.forEach((vnode) => {
                const { type, children } = vnode
                if (type.name === name) results.push(vnode)
                if (children) {
                    if (typeof children.default === 'function') {
                        getChildNodesByName(name, children.default(), results)
                    } else if (Array.isArray(children)) {
                        getChildNodesByName(name, children, results)
                    }
                }
            })
            return results
        }

        /* FIXME: 对于动态slolts，目前有bug未修复，参见用户管理的表单 */
        const renderFormItems = () => {
            const { column } = props
            if (slots && typeof slots.default === 'function') {
                const items = getChildNodesByName('AFormItem', slots.default())
                const rows = new Array(Math.ceil(items.length / column)).fill(null)
                const cols = new Array(column).fill(null)
                return rows.map((_, row) => (
                    <Row type='flex'>
                        {cols.map((_, col) => (
                            <Col span={24 / column}>{items[row * column + col]}</Col>
                        ))}
                    </Row>
                ))
            }
            return null
        }

        const widthRef = computed(() => {
            const { column } = props
            const map: Record<number, number> = {
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
                        {...getAttrs('modal')}
                        confirmLoading={loading}
                        width={unref(widthRef)}
                        visible={unref(visibleRef)}
                        afterClose={modalAfterClose}
                        onOk={onOk}
                        onCancel={onCancel}
                    >
                        <Form
                            {...getAttrs('form')}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            labelAlign='right'
                            scrollToFirstError={true}
                            ref={formRef}
                            model={modelRef.value}
                        >
                            {renderFormItems()}
                        </Form>
                    </Modal>
                </div>
            )
        }
    }
})
