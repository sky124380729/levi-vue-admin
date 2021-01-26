<template>
    <div>
        <FormModal v-model:form="form" v-model:visible="visible" title="测试" :rules="rules" :loading="loading" @submit="submit">
            <a-form-item label="登录名" name="username">
                <a-input v-model:value="form.username" />
            </a-form-item>
            <a-form-item label="姓名" name="name">
                <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="姓名" name="name">
                <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="姓名" name="name">
                <a-input v-model:value="form.name" />
            </a-form-item>
        </FormModal>
        <a-button type="primary" @click="show">开启</a-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import FormModal from '/@/components/FormModal'
export default defineComponent({
    components: {
        FormModal
    },
    setup() {
        const visible = ref<boolean>(false)
        const loading = ref<boolean>(false)
        const rules = {
            username: { required: true, type: 'string' }
        }
        const form = reactive<any>({})
        const show = () => {
            visible.value = true
        }
        const submit = () => {
            loading.value = true
            setTimeout(() => {
                loading.value = false
                visible.value = false
            }, 2000)
        }
        return { rules, form, visible, show, submit, loading }
    }
})
</script>

<style scoped></style>
