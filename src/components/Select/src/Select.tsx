import { defineComponent, PropType, ref, computed, unref } from 'vue'
import { Select } from 'ant-design-vue'

export default defineComponent({
    name: 'LvSelect',
    props: {
        modelValue: {
            required: true,
            type: [String, Number, Array] as any
        },
        dict: String
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        console.log(props)
        const selectRef = ref(
            computed({
                get() {
                    return props.modelValue
                },
                set(val) {
                    emit('update:modelValue', val)
                }
            })
        )
        return () => {
            return <Select value={unref(selectRef)}></Select>
        }
    }
})
