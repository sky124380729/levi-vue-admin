<template>
    <div class="resource">
        <a-alert
            message="重要提示"
            description="系统的菜单是由前端通过配置文件导出SQL放到数据库中，后台操作数据库会导致部署到各个环境不一致，需要修改菜单数据请联系前端"
            type="warning"
            show-icon
        />
        <a-table row-key="id" :columns="columns" :data-source="data" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getResourceTree } from '/@/apis/modules/resource'

export default defineComponent({
    name: 'system-resource',
    setup() {
        const columns: any[] = [
            { title: '资源名称', dataIndex: 'title' },
            { title: '资源类型', dataIndex: 'type' },
            { title: '资源编码', dataIndex: 'name' },
            { title: '资源地址', dataIndex: 'uri' },
            { title: '资源地址重定向', dataIndex: 'redirectUri' },
            { title: '组件地址', dataIndex: 'componentPath' },
            { title: '资源图标', dataIndex: 'icon' },
            { title: '是否隐藏(菜单)', dataIndex: 'hidden' },
            { title: '是否全屏(菜单)', dataIndex: 'fullScreen' }
        ]
        const data = ref([])

        const getAllResourceTree = async () => {
            const res = await getResourceTree()
            if (!res) return
            console.log(res)
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
