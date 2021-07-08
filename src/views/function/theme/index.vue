<template>
    <div class="theme">
        <a-input v-model:value="color"></a-input>
        <a-button @click="test">改变primary</a-button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { replaceCssVars } from '/vt/plugins/antdTheme/client'
export default defineComponent({
    name: 'function-theme',
    setup() {
        const color = ref('red')
        const test = () => {
            replaceCssVars('blue', color.value)
        }
        return {
            color,
            test
        }
    }
})
</script>

<style lang="less">
.theme {
    background-color: #1890ff;
}
</style>
