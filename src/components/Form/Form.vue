<template>
    <div class="validate-form-container">
        <slot></slot>
        <div class="submit-area" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
    name: 'Form',
    emits: ['form-submit'],
    setup(_, { emit }) {
        const funcArr: ValidateFunc[] = []

        const submitForm = () => {
            const result = funcArr.map((func) => func()).every((result) => result)
            emit('form-submit', result)
        }

        const callback = (func?: ValidateFunc) => {
            if (func) {
                funcArr.push(func)
            }
        }
        emitter.on('form-item-created', callback)

        onUnmounted(() => {
            emitter.off('form-item-created', callback)
        })
        return {
            submitForm
        }
    }
})
</script>

<style scoped></style>
