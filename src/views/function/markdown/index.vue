<template>
    <div id="editor">
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { debounce } from '@pinkbin/utils'
import marked from 'marked'
export default defineComponent({
    name: 'function-markdown',
    setup() {
        const input = ref('# heelo')
        const compiledMarkdown = computed(() => marked(input.value))
        const update = debounce((e: any) => {
            input.value = e.target.value
        })
        return {
            input,
            compiledMarkdown,
            update
        }
    }
})
</script>

<style lang="less" scoped>
html,
body,
#editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
}

textarea,
#editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
}

textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
}

code {
    color: #f66;
}
</style>
