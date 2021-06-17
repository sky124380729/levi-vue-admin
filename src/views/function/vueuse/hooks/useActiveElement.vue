<template>
    <p class="mb-3">Select the inputs below to see the changes</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input v-for="i in 6" :key="i" type="text" :data-id="i" class="!my-0" :placeholder="`${i}`" />
    </div>
    <div class="mt-2">
        Current Active Element:
        <span class="text-primary">{{ key }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useActiveElement } from '@vueuse/core'
export default defineComponent({
    name: 'useActiveElement',
    setup() {
        const activeElement = useActiveElement()
        const key = computed(() => activeElement.value?.dataset?.id || 'null')
        return { key }
    }
})
</script>
