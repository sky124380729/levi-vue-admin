<template>
    <pre lang="yaml">{{ text }}</pre>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useBattery } from '@vueuse/core'
import { stringify } from './utils'
export default defineComponent({
    setup() {
        const battery = reactive(useBattery())
        const text = stringify(battery)
        return {
            text
        }
    }
})
</script>
