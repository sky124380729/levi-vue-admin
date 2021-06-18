import { defineComponent, ref, PropType, onMounted, h } from 'vue'
import { componentMap, ComponentType } from '/@/utils/componentMap'
import { Form, Row, Col } from 'ant-design-vue'
import { isNumber } from '@pinkbin/utils'

export type ColumnType = 1 | 2 | 3 | 4

export interface FormSchema {
    // Field name
    key: string
    // Field label
    label: string
    // render component
    component: ComponentType
    // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
    labelWidth?: string | number
    // Wrapper width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
    wrapperWidth?: string | number
    // Field show
    show?: any
    // Field rules
    rules?: any
    // Component props
    props?: any
    // Component slots
    slots?: any
}

export default defineComponent({
    name: 'LvForm',
    props: {
        modelValue: {
            type: Object as PropType<Recordable>,
            default: () => ({})
        },
        schemas: {
            type: Array as PropType<FormSchema[]>,
            default: () => []
        },
        column: {
            type: Number as PropType<ColumnType>,
            default: 2
        },
        labelWidth: {
            type: [Number, String] as PropType<number | string>,
            default: 110
        }
    },
    emits: ['getFormRef'],
    setup(props, { emit }) {
        const formRef = ref(null)
        onMounted(() => {
            emit('getFormRef', formRef)
        })
        return () => {
            const { modelValue } = props

            // render inner component
            const renderComp = (schema: FormSchema) => {
                const { key, component, props: propsData, slots } = schema
                const isCheck = ['Switch', 'Checkbox'].includes(component)
                const eventKey = 'onChange'
                const bindValue = {
                    [isCheck ? 'checked' : 'value']: modelValue[key]
                }
                const on = {
                    [eventKey]: (e: Nullable<Recordable>) => {
                        const target = e ? e.target : null
                        const value = target ? (isCheck ? target.checked : target.value) : e
                        modelValue[key] = value
                    }
                }
                const compAttr: any = {
                    ...on,
                    ...bindValue,
                    ...propsData
                }
                const Comp = componentMap.get(component) as typeof defineComponent
                return h(Comp, { style: { width: '100%' }, ...compAttr }, slots)
            }

            // use item width first,if it is not set,use form width
            const getItemLabelWidth = (w: string | number | undefined) => {
                let width = w || props.labelWidth
                if (width) {
                    width = isNumber(width) ? `${width}px` : width
                }
                return {
                    labelCol: { style: { width } },
                    wrapperCol: { style: { width: `calc(100% - ${width})` } }
                }
            }

            // render Form Item
            const renderFormItems = () => {
                const { schemas, column } = props
                // filter it item is not show
                const items = schemas.filter((schema) => schema.show !== false)
                const rows = new Array(Math.ceil(items.length / column)).fill(null)
                const cols = new Array(column).fill(null)
                return rows.map((_, row) => (
                    <Row type='flex'>
                        {cols.map((_, col) => {
                            const schema = items[row * column + col]
                            if (schema) {
                                const { key, label, rules, labelWidth } = schema
                                const { labelCol, wrapperCol } = getItemLabelWidth(labelWidth)
                                return (
                                    <Col span={24 / column}>
                                        <Form.Item name={key} style={{ paddingRight: '15px' }} labelCol={labelCol} wrapperCol={wrapperCol} label={label} rules={rules}>
                                            {renderComp(schema)}
                                        </Form.Item>
                                    </Col>
                                )
                            }
                            return null
                        })}
                    </Row>
                ))
            }

            return (
                <Form ref={formRef} model={modelValue} labelAlign='right'>
                    {renderFormItems()}
                </Form>
            )
        }
    }
})
