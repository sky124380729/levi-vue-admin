<template>
    <div>
        <div>platform</div>
        <a-input></a-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import apis from '/@/apis'
export default defineComponent({
    name: 'platform',
    setup() {
        console.log(apis)
        return {}
    }
})
</script>

<style scoped></style>
