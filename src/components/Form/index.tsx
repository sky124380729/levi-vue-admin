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
    // Event name triggered by internal value change, default change
    changeEvent?: string
    // Variable name bound to v-model Default value
    valueField?: string
    // Label name
    label: string
    // Auxiliary text
    subLabel?: string
    // Help text on the right side of the text
    helpMessage?: string | string[]
    // BaseHelp component props
    // helpComponentProps?: Partial<HelpComponentProps>
    // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
    labelWidth?: string | number
    // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
    disabledLabelWidth?: boolean
    // render component
    component: ComponentType
}

export default defineComponent({
    name: 'Levi-Form',
    props: {
        schemas: {
            required: true,
            type: Array as PropType<FormSchema[]>
        }
    },
    setup(props) {
        return () => {
            const { schemas } = props

            const renderComp = (component: ComponentType) => {
                const Comp = componentMap.get(component) as typeof defineComponent
                return <Comp></Comp>
            }

            return (
                <Form>
                    {schemas.map((schema: FormSchema) => {
                        const { key, label, component } = schema
                        return (
                            <Form.Item name={key} label={label}>
                                {renderComp(component)}
                            </Form.Item>
                        )
                    })}
                </Form>
            )
        }
    }
})
