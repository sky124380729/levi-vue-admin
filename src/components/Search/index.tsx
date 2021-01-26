import { defineComponent, reactive, ref, unref } from 'vue'
import './index.less'
import { Form, Space, Button } from 'ant-design-vue'
import { componentMap } from '/@/utils/componentMap'

import Icon from '/@/components/Icon'
interface FormProps {
    validate: () => Promise<any>
    resetFields: () => void
}

// 支持数组或者对象，使用数组的话使用对象的默认配置
export default defineComponent({
    name: 'LvSearch',
    props: {
        terms: [Array, Object]
    },
    emits: ['query'],
    setup(props, { emit }) {
        const defaultSettings: any = {
            size: 'small',
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
        // 渲染组件
        const renderComp = (config: any) => {
            const { component, key, label, width, props, slots } = config
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
            const compAttr: any = {
                ...on,
                ...bindValue,
                ...props
            }
            const Comp = componentMap.get(component) as typeof defineComponent
            return (
                <Comp {...compAttr} style={{ width: width || '200px' }} placeholder={(component === 'Select' ? '请选择' : '请输入') + label}>
                    {{ ...slots }}
                </Comp>
            )
        }
        return () => {
            const { showLabel, terms } = mergeConfig(props.terms)
            if (!terms || !terms.length) return
            return (
                <div class='levi-search'>
                    <Form model={model} layout='inline' ref={ruleForm}>
                        {terms.map((v: any) => (
                            <Form.Item rules={v.rules} name={v.key} label={showLabel ? v.label : void 0}>
                                {renderComp(v)}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Space size={10}>
                                <Button type='primary' onClick={() => query(true)}>
                                    {{
                                        default: () => <span>查询</span>,
                                        icon: () => <Icon icon='uil:search' />
                                    }}
                                </Button>
                                <Button type='danger' onClick={() => query(false)}>
                                    {{
                                        default: () => <span>重置</span>,
                                        icon: () => <Icon icon='mdi:delete' />
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
