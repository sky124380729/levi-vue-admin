<template>
    <div>
        <Dropdown title="dropdown">
            <DropdownItem disabled>1</DropdownItem>
            <DropdownItem>2</DropdownItem>
        </Dropdown>
        <Form @form-submit="onFormSubmit">
            <FormItem></FormItem>
        </Form>
        <button @click="showMsg">测试message</button>

        <!-- <input type="file" name="file" @change.prevent="handleFileChange" /> -->

        <Upload action="/" @file-uploaded-error="error"></Upload>
    </div>
</template>

<script lang="ts">
import Dropdown from '/@/components/Dropdown/Dropdown.vue'
import DropdownItem from '/@/components/Dropdown/DropdownItem.vue'
import Form from '/@/components/Form/Form.vue'
import FormItem from '/@/components/Form/FormItem.vue'
import createMessage from '/@/components/Message/createMessage'
import Upload from '/@/components/Upload/index.vue'
import axios from 'axios'
export default {
    name: 'Test',
    components: {
        Dropdown,
        DropdownItem,
        Form,
        FormItem,
        Upload
    },
    setup() {
        const showMsg = () => {
            createMessage('嘿嘿', 'primary')
        }
        const onFormSubmit = (result: boolean) => {
            console.log(result)
        }
        const error = (e: any) => {
            console.log(e)
        }
        const handleFileChange = (e: Event) => {
            const target = e.target as HTMLInputElement
            const files = target.files
            if (files) {
                const uploadedFile = files[0]
                const formData = new FormData()
                formData.append(uploadedFile.name, uploadedFile)
                axios
                    .post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        console.log(res)
                    })
            }
        }
        return {
            onFormSubmit,
            showMsg,
            handleFileChange,
            error
        }
    }
}
</script>
