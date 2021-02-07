import { computed, defineComponent, unref } from 'vue'
import type { PropType } from 'vue'
import { Input } from 'ant-design-vue'

export default defineComponent({
    name: 'LvInput',
    inheritAttrs: false,
    props: {
        value: {
            type: String as PropType<string>
        }
    },
    emits: ['update:value'],
    setup(props, { attrs, emit, slots }) {
        const inputRef = computed<string>({
            get() {
                return props.value || ''
            },
            set(val) {
                emit('update:value', val)
            }
        })
        return () => {
            return (
                <Input value={unref(inputRef)} {...attrs}>
                    {slots}
                </Input>
            )
        }
    }
})
