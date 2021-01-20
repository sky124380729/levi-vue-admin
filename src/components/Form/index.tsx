import { defineComponent, PropType } from 'vue'
import { componentMap } from '/@/utils/componentMap'
import { Form } from 'ant-design-vue'

export type ComponentType =
    | 'Input'
    | 'InputGroup'
    | 'InputPassword'
    | 'InputSearch'
    | 'InputTextArea'
    | 'InputNumber'
    | 'InputCountDown'
    | 'Select'
    | 'ApiSelect'
    | 'SelectOptGroup'
    | 'SelectOption'
    | 'TreeSelect'
    | 'Transfer'
    | 'RadioButtonGroup'
    | 'RadioGroup'
    | 'Checkbox'
    | 'CheckboxGroup'
    | 'AutoComplete'
    | 'Cascader'
    | 'DatePicker'
    | 'MonthPicker'
    | 'RangePicker'
    | 'WeekPicker'
    | 'TimePicker'
    | 'ImageUpload'
    | 'Switch'
    | 'StrengthMeter'
    | 'Upload'
    | 'Render'

export interface FormSchema {
    // Field name
    key: string
    // Field label
    label: string
    // Field rules
    rules?: any
    // render component
    component: ComponentType
    // Component props
    props?: any
    // Component width
    width?: string | number
    // Component slots
    slots?: any
}

export default defineComponent({
    name: 'Levi-Form',
    props: {
        model: {
            type: Object as PropType<Record<string, any>>,
            default: {}
        },
        labelWidth: {
            type: [Number, String] as PropType<number | string>,
            default: 0
        },
        schemas: {
            required: true,
            type: Array as PropType<FormSchema[]>
        }
    },
    setup(props, { attrs }) {
        return () => {
            const { model, schemas } = props

            const renderComp = (schema: FormSchema) => {
                const { key, component, props: propsData, width, slots } = schema
                const isCheck = ['Switch', 'Checkbox'].includes(component)
                const eventKey = 'onChange'
                const bindValue = {
                    [isCheck ? 'checked' : 'value']: model[key]
                }
                const on = {
                    [eventKey]: (e: Nullable<Record<string, any>>) => {
                        const target = e ? e.target : null
                        const value = target ? (isCheck ? target.checked : target.value) : e
                        model[key] = value
                    }
                }
                const getWidth = (width: any) => {
                    if (typeof width === 'undefined') {
                        return '200px'
                    } else if (typeof width === 'string') {
                        return width
                    } else {
                        return width + 'px'
                    }
                }
                const compAttr: any = {
                    ...on,
                    ...attrs,
                    ...bindValue,
                    ...propsData
                }
                const Comp = componentMap.get(component) as typeof defineComponent
                return (
                    <Comp {...compAttr} style={{ width: getWidth(width) }}>
                        {{ ...slots }}
                    </Comp>
                )
            }

            return (
                <Form model={model}>
                    {schemas.map((schema: FormSchema) => {
                        const { key, label, rules } = schema
                        return (
                            <Form.Item rules={rules} name={key} label={label}>
                                {renderComp(schema)}
                            </Form.Item>
                        )
                    })}
                </Form>
            )
        }
    }
})
