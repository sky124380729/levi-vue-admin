<template>
    <div class="resource" style="background-color: #fff">
        <a-alert
            message="Warning..............."
            description="系统的菜单是由前端通过配置文件导出SQL放到数据库中，后端直接操作数据库会导致部署到各个环境不一致，需要修改菜单数据请联系前端"
            show-icon
        />
        <a-divider>关于此处的RBAC设计，可参考我的<a target="_blank" href="https://segmentfault.com/a/1190000037670317">blog</a></a-divider>
        <a-table class="mt20" bordered row-key="id" :columns="columns" :data-source="data">
            <template #type="{ text: type }">
                <a-tag v-if="type === 'MODULE'" color="#108ee9">
                    <template #icon><lv-icon icon="octicon:file-submodule" color="#87d068"></lv-icon></template>模块
                </a-tag>
                <a-tag v-else-if="type === 'MENU'" color="#2db7f5">
                    <template #icon><lv-icon icon="ic:round-menu-open" color="#87d068"></lv-icon></template>菜单
                </a-tag>
                <a-tag v-else-if="type === 'BUTTON'" color="#87d068">
                    <template #icon><lv-icon icon="octicon:file-submodule" color="#87d068"></lv-icon></template>按钮
                </a-tag>
            </template>
            <template #icon="{ text: icon }">
                <lv-icon :icon="icon" color="orange"></lv-icon>
            </template>
            <template #hidden="{ text: flag }">
                <a-tag v-if="flag" color="cyan">是</a-tag>
                <a-tag v-else color="pink">否</a-tag>
            </template>
            <template #fullScreen="{ text: flag }">
                <a-tag v-if="flag" color="cyan">是</a-tag>
                <a-tag v-else color="pink">否</a-tag>
            </template>
            <template #noCache="{ text: flag }">
                <a-tag v-if="flag" color="cyan">是</a-tag>
                <a-tag v-else color="pink">否</a-tag>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getMenuTree } from '/@/apis/modules/menu'

export default defineComponent({
    name: 'system-resource',
    setup() {
        const columns: any[] = [
            { title: '资源名称', dataIndex: 'title' },
            { title: '资源类型', dataIndex: 'type', align: 'center', slots: { customRender: 'type' } },
            { title: '资源编码', dataIndex: 'name', align: 'center' },
            { title: '资源地址', dataIndex: 'path', align: 'center' },
            { title: '资源地址重定向', dataIndex: 'redirect', align: 'center' },
            { title: '组件地址', dataIndex: 'component', align: 'center' },
            { title: '资源图标', dataIndex: 'icon', align: 'center', slots: { customRender: 'icon' } },
            { title: '是否隐藏', dataIndex: 'hidden', align: 'center', slots: { customRender: 'hidden' } },
            { title: '是否全屏', dataIndex: 'fullScreen', align: 'center', slots: { customRender: 'fullScreen' } },
            { title: '是否缓存', dataIndex: 'noCache', align: 'center', slots: { customRender: 'noCache' } }
        ]
        const data = ref([])

        const getAllResourceTree = async () => {
            const res = await getMenuTree()
            if (!res) return
            data.value = res.data
        }

        onMounted(() => {
            getAllResourceTree()
        })

        return {
            columns,
            data
        }
    }
})
</script>
