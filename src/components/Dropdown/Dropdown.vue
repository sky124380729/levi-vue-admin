<template>
    <div ref="dropdownRef" class="dropdown" style="display: inline-block">
        <a href="#" class="btn btn-primary my-2 dropdown-toggle" @click.prevent="toggleOpen">
            {{ title }}
        </a>
        <ul v-if="isOpen" class="dropdown-menu" style="display: block">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '/@/hooks/useClickOutside'

export default defineComponent({
    name: 'Dropdown',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const isOpen = ref<boolean>(false)
        const dropdownRef = ref<HTMLElement | null>(null)
        const toggleOpen = () => {
            isOpen.value = !isOpen.value
        }
        const isClickOutside = useClickOutside(dropdownRef)
        watch(isClickOutside, () => {
            if (isOpen.value && isClickOutside.value) {
                isOpen.value = false
            }
        })
        return {
            isOpen,
            toggleOpen,
            dropdownRef
        }
    }
})
</script>
