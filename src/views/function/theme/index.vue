<template>
    <div class="theme">
        <!-- <a-input @></a-input> -->
        <a-input v-model:value="color"></a-input>
        <a-button @click="test">改变primary</a-button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { replaceCssVars } from '../../../../vite/plugins/theme/client'
export default defineComponent({
    name: 'function-theme',
    setup() {
        const color = ref('#008ccf')
        const test = () => {
            replaceCssVars('primary', color.value)
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
    background-color: #008ccf;
}
</style>
