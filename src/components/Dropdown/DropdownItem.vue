<template>
    <li class="dropdown-item" :class="{ 'is-disabled': disabled }">
        <slot></slot>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DropdownItem',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
.dropdown-item.is-disabled {
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
}
</style>
