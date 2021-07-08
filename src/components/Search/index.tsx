import { defineComponent, reactive, ref, unref, h } from 'vue'
import './index.less'
import { Form, Space, Button } from 'ant-design-vue'
import { componentMap } from '/@/utils/componentMap'
import type { FormSchema } from '/@/components'
import { LvIcon } from '/@/components'
import { isNumber, isString } from '@pinkbin/utils'

interface FormProps {
    validate: () => Promise<any>
    resetFields: () => void
}

type SearchFormSchema = Omit<FormSchema, 'labelWidth' | 'wrapperWidth' | 'show'> & {
    width?: number | string
}
interface SearchGlobalSettings {
    showLabel: boolean
    terms: SearchFormSchema[]
}

// 支持数组或者对象，使用数组的话使用对象的默认配置
export default defineComponent({
    name: 'LvSearch',
    props: {
        terms: [Array, Object]
    },
    emits: ['query'],
    setup(props, { emit }) {
        const defaultSettings: SearchGlobalSettings = {
            showLabel: false,
            terms: []
        }
        const model = reactive<any>({})
        const ruleForm = ref<FormProps | null>(null)
        // 合并配置项
        function mergeConfig(config: any): any {
            if (Array.isArray(config)) {
                defaultSettings.terms = config
                return defaultSettings
            }
            return config
        }
        // 查询
        const query = (withTerms: boolean) => {
            const form = unref(ruleForm)
            if (!form) return
            form.validate()
                .then(() => {
                    if (!withTerms) {
                        form.resetFields()
                    }
                    emit('query', model)
                })
                .catch(() => null)
        }

        const getWrapperWidth = (width: string | number | undefined) => {
            if (width) {
                width = isNumber(width) ? `${width}px` : width
            } else {
                width = '200px'
            }
            return {
                style: { width }
            }
        }

        // 渲染组件
        const renderComp = (schema: SearchFormSchema) => {
            const { key, component, props: propsData, width, label, slots } = schema
            const isCheck = ['Switch', 'Checkbox'].includes(component)
            const eventKey = 'onChange'
            const bindValue = {
                [isCheck ? 'checked' : 'value']: model[key]
            }
            const on = {
                [eventKey]: (e: Nullable<Recordable>) => {
                    const target = e ? e.target : null
                    const value = target ? (isCheck ? target.checked : target.value) : e
                    model[key] = isString(value) ? value.trim() : value
                }
            }
            const compAttr: any = {
                ...on,
                ...bindValue,
                ...propsData
            }

            const Comp = componentMap.get(component) as typeof defineComponent
            return h(
                Comp,
                {
                    ...compAttr,
                    ...getWrapperWidth(width),
                    placeholder: (component === 'Select' ? '请选择' : '请输入') + label
                },
                slots
            )
        }
        return () => {
            const { showLabel, terms } = mergeConfig(props.terms)
            if (!terms || !terms.length) return
            return (
                <div class='levi-search'>
                    <Form model={model} layout='inline' ref={ruleForm}>
                        {terms.map((schema: SearchFormSchema) => (
                            <Form.Item rules={schema.rules} name={schema.key} label={showLabel ? schema.label : void 0}>
                                {renderComp(schema)}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Space size={10}>
                                <Button type='primary' shape='round' onClick={() => query(true)}>
                                    {{
                                        default: () => <span>search</span>,
                                        icon: () => <LvIcon size={14} icon='uil:search' />
                                    }}
                                </Button>
                                <Button type='primary' danger shape='round' onClick={() => query(false)}>
                                    {{
                                        default: () => <span>reset</span>,
                                        icon: () => <LvIcon size={14} icon='ant-design:delete-row-outlined' />
                                    }}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            )
        }
    }
})
