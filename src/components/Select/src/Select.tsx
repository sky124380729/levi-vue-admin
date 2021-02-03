import { computed, defineComponent, ref, unref } from 'vue'
import type { PropType, Ref } from 'vue'
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
        const dictMap: Record<string, any> = useStore().state.dict

        const selectRef = ref<Ref<SelectValue>>(
            computed({
                get() {
                    return props.value || ''
                },
                set(val) {
                    emit('update:value', val)
                }
            })
        )

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

        const handleSelect = (val: SelectValue) => {
            selectRef.value = val
        }

        return () => {
            /* FIXME: attrs传进来会有问题 */
            return <Select {...attrs} value={unref(selectRef)} onSelect={handleSelect} options={unref(list)}></Select>
        }
    }
})
