<template>
    <div class="validate-input-container pb-3">
        <input v-if="tag !== 'textarea'" v-model="inputRef.val" :class="['form-control', { 'is-invalid': inputRef.error }]" v-bind="$attrs" @blur="validateInput" />
        <textarea v-else v-model="inputRef.val" v-bind="$attrs" :class="['form-control', { 'is-invalid': inputRef.error }]" @blur="validateInput"> </textarea>
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import type { PropType } from 'vue'
import { emitter } from './Form.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type: 'required' | 'email' | 'custom'
    message: string
    validator?: () => boolean
}
type TagType = 'input' | 'textarea'
export type RulesProp = RuleProp[]
export default defineComponent({
    name: 'FormItem',
    inheritAttrs: false,
    props: {
        rules: {
            type: Array as PropType<RulesProp>
        },
        tag: {
            type: String as PropType<TagType>,
            default: 'input'
        }
    },
    setup(props) {
        const inputRef = reactive({
            val: '',
            error: false,
            message: ''
        })
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every((rule) => {
                    let passed = true
                    inputRef.message = rule.message
                    switch (rule.type) {
                        case 'required':
                            passed = inputRef.val.trim() !== ''
                            break
                        case 'email':
                            passed = emailReg.test(inputRef.val)
                            break
                        case 'custom':
                            passed = rule.validator ? rule.validator() : true
                            break
                        default:
                            break
                    }
                    return passed
                })
                inputRef.error = !allPassed
                return allPassed
            }
            return true
        }
        onMounted(() => {
            emitter.emit('form-item-created', validateInput)
        })
        return {
            inputRef,
            validateInput
        }
    }
})
</script>

<style scoped></style>
