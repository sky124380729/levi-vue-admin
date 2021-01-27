import { computed, defineComponent, unref } from 'vue'
import { useStore } from 'vuex'
import { Select, message } from 'ant-design-vue'

interface IOption {
    label: string | number
    value: string | number
}
export default defineComponent({
    name: 'LvSelect',
    props: ['value', 'dict', 'oLabel', 'oValue'],
    emits: ['update:value'],
    setup(props, { attrs, emit }) {
        const dictMap: Record<string, any> = useStore().state.dict

        const list = computed(() => {
            const { dict, oLabel, oValue } = props
            let list: any = attrs.options || []
            if (dict) {
                const item = dictMap[dict]
                if (!item) {
                    return message.error(`unknown dict ===== ${dict} ===== , please check it`)
                }
                list = Object.keys(item).reduce((prev: IOption[], key) => {
                    const value = item[key]
                    prev.push({
                        label: value,
                        value: key
                    })
                    return prev
                }, [])
            }
            /* FIXME: 这里暂时没起作用 */
            if (oLabel && oValue && attrs.options.length) {
                list = attrs.options.map((v: any) => ({
                    label: v[oLabel],
                    value: v[oValue]
                }))
            }
            return list
        })

        return () => {
            /* FIXME: 外部传onChange时候也会出问题 */
            return <Select value={props.value} options={unref(list)} onChange={(val) => emit('update:value', val)}></Select>
        }
    }
})
