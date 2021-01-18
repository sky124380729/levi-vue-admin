import { defineComponent, reactive } from 'vue'
import './index.less'
import { Form, Space, Button } from 'ant-design-vue'
import { componentMap } from './componentMap'

import Icon from '/@/components/Icon'

// 支持数组或者对象，使用数组的话使用对象的默认配置
export default defineComponent({
    name: 'Levi-Search',
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
        function mergeConfig(config: any): any {
            if (Array.isArray(config)) {
                defaultSettings.terms = config
                return defaultSettings
            }
            return config
        }
        const query = (withTerms: boolean) => {
            if (!withTerms) {
                Object.keys(model).forEach((key) => {
                    delete model[key]
                })
            }
            emit('query', model)
        }
        // 渲染组件
        const renderComp = (config: any) => {
            const { comp, key, label, width, props, slots } = config
            const isCheck = ['Switch', 'Checkbox'].includes(comp)
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
            const Comp = componentMap.get(comp) as typeof defineComponent
            return (
                <Comp {...compAttr} style={{ width: width || '200px' }} placeholder={(comp === 'Select' ? '请选择' : '请输入') + label}>
                    {{ ...slots }}
                </Comp>
            )
        }
        return () => {
            const { showLabel, terms } = mergeConfig(props.terms)
            if (!terms || !terms.length) return
            return (
                <div class='levi-search'>
                    <Form layout='inline'>
                        {terms.map((v: any) => (
                            <Form.Item name={v.key} label={showLabel ? v.label : void 0}>
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
                                        icon: () => <Icon icon='uil:search' />
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
