<template>
    <div class="alert fade show fixed-top mt-3" :class="`alert-${type}`">
        {{ message }}
        <button type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { MessageType } from './types'
export default defineComponent({
    props: {
        type: {
            type: String as PropType<MessageType>,
            default: 'primary'
        },
        message: {
            type: String,
            required: true
        }
    },
    setup() {
        return {}
    }
})
</script>
