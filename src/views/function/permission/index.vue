<template>
    <a-space>
        <a-button v-permission="'create'" type="primary">新增</a-button>
        <a-button v-permission="'edit'" type="primary">编辑</a-button>
        <a-button v-permission="'delete'" type="primary">删除</a-button>
    </a-space>
</template>

<script>
import { defineComponent } from 'vue'
import menu from '/@/router/menu'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'function-permission',
    setup() {
        const accessBtns = useStore().state.accessBtns
        return {
            menu,
            accessBtns
        }
    }
})
</script>

<style lang="less"></style>
