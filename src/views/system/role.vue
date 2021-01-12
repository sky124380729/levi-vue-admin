<template>
    <div class="role">
        角色管理
        <a-input></a-input>

        <a-button @click="goBack">返回</a-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'system-role',
    setup() {
        const { go } = useRouter()
        const goBack = () => {
            go(-1)
        }
        return {
            goBack
        }
    }
})
</script>

<style lang="less" scoped>
.role {
    width: 100vw;
    height: 100vh;
    padding: 100px;
    background-color: rgb(232, 250, 250);
    .ant-btn {
        float: right;
        margin-top: 20px;
    }
}
</style>
