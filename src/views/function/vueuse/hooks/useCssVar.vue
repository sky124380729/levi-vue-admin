<template>
    <div ref="el" style="--color: #7fa998; color: var(--color)">Sample text, {{ color }}</div>
    <button @click="switchColor">Change Color</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCssVar } from '@vueuse/core'

export default defineComponent({
    setup() {
        const el = ref(null)
        const color = useCssVar('--color', el)
        const switchColor = () => {
            if (color.value === '#df8543') color.value = '#7fa998'
            else color.value = '#df8543'
        }
        return {
            el,
            color,
            switchColor
        }
    }
})
</script>
