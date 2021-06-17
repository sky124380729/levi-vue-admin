<template>
    <pre lang="yaml">{{ text }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBrowserLocation } from '@vueuse/core'
import { stringify } from './utils'

export default defineComponent({
    setup() {
        const location = useBrowserLocation()
        const text = stringify(location)
        return {
            text
        }
    }
})
</script>
