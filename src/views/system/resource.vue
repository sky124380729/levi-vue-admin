<template>
    <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="treeData"
        :replace-fields="replaceFields"
        @select="onSelect"
        @check="onCheck"
    >
    </a-tree>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { resource } from '/@/router/index'

export default defineComponent({
    name: 'system-resource',
    setup() {
        const expandedKeys = ref([])
        const selectedKeys = ref([])
        const checkedKeys = ref([])
        const onSelect = (selectedKeys: any, info: any) => {
            console.log('selected', selectedKeys, info)
        }
        const onCheck = (checkedKeys: any, info: any) => {
            console.log('onCheck', checkedKeys, info)
        }
        const replaceFields = {
            children: 'children',
            title: 'title',
            key: 'id'
        }
        const treeData = resource
        return {
            expandedKeys,
            selectedKeys,
            checkedKeys,
            treeData,
            onSelect,
            onCheck,
            replaceFields
        }
    }
})
</script>
