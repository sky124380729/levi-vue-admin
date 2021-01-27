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

        <lv-select v-model:value="selectValue" style="width: 200px" o-label="name" o-value="id" :options="options"></lv-select>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive } from 'vue'

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
        const selectValue = ref('')
        const options = [
            { name: 'xxxxxxxxx', id: 1 },
            { name: 'yyyyyyyyy', id: 2 }
        ]
        const change = (e) => {
            console.log(e, 'e')
            console.log(selectValue.value, 'ss')
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
            selectValue,
            show,
            submit,
            change,
            options
        }
    }
})
</script>
