import { computed, defineComponent, unref } from 'vue'
import type { PropType } from 'vue'
import { useStore } from 'vuex'
import { Select, message } from 'ant-design-vue'
import { SelectValue } from 'ant-design-vue/lib/select'

interface IOption {
    label: string | number
    value: string | number
}

export default defineComponent({
    name: 'LvSelect',
    inheritAttrs: false,
    props: {
        value: {
            type: [Array, Object, String, Number] as PropType<SelectValue>
        },
        dict: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        },
        oLabel: {
            type: String
        },
        oValue: {
            type: String
        }
    },
    emits: ['update:value'],
    setup(props, { emit, attrs }) {
        const dictMap: Recordable = useStore().state.dict

        const selectRef = computed<SelectValue>({
            get() {
                return props.value || ''
            },
            set(val) {
                emit('update:value', val)
            }
        })

        const list = computed(() => {
            const { dict, oLabel, oValue } = props
            let list: any = props.options || []
            if (dict) {
                const item = dictMap[dict]
                if (!item) {
                    message.error(`unknown dict ===== ${dict} ===== , please check it`)
                } else {
                    list = Object.keys(item).reduce((prev: IOption[], key) => {
                        const value = item[key]
                        prev.push({
                            label: value,
                            value: key
                        })
                        return prev
                    }, [])
                }
            }

            if (oLabel && oValue && props.options.length) {
                list = props.options.map((v: any) => ({
                    label: v[oLabel],
                    value: v[oValue]
                }))
            }
            return list
        })

        return () => {
            // 覆盖传进来的onChange事件
            const { onChange, ...selectAttrs } = attrs

            const handleChange = (val: SelectValue, ...args: any[]) => {
                selectRef.value = val
                if (onChange && typeof onChange === 'function') {
                    onChange.apply(void 0, [val, ...args])
                }
            }

            return <Select {...selectAttrs} value={unref(selectRef)} onChange={handleChange} options={unref(list)}></Select>
        }
    }
})
