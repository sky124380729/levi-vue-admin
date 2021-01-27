<template>
    <div>
        <lv-modal-form v-model:form="form" v-model:visible="visible" title="测试" :rules="rules" :loading="loading" @submit="submit">
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
        </lv-modal-form>
        <a-button type="primary" @click="show">测试组件</a-button>

        <lv-select></lv-select>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'

import { ModalFormType } from '/@/components/FormModal'
export default defineComponent({
    setup() {
        const model = reactive<ModalFormType>({
            visible: false,
            loading: false,
            rules: {
                username: { required: true, type: 'string' }
            },
            form: {}
        })
        const show = () => {
            model.visible = true
        }
        const submit = () => {
            model.loading = true
            setTimeout(() => {
                model.loading = false
                model.visible = false
            }, 2000)
        }
        return {
            ...toRefs(model),
            show,
            submit
        }
    }
})
</script>
