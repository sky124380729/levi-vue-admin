<template>
    <div class="github">
        <h1 class="title">Last Levi-vue-admin commits</h1>
        <a-radio-group v-model:value="currentBranch" button-style="solid">
            <a-radio-button v-for="item in branchs" :key="item" :value="item">{{ item }}</a-radio-button>
        </a-radio-group>
        <p class="project-url">sky124380729/levi-vue-admin@{{ currentBranch }}</p>
        <a-list bordered :loading="loading" :data-source="commits">
            <template #renderItem="{ item: record }">
                <a-list-item>
                    <a class="commit-link" :href="record.html_url" target="_blank">{{ record.sha.slice(0, 12) }}...</a> - <span>{{ truncate(record.commit.message) }}</span>
                    <div class="author-info">
                        by
                        <a class="author-link" :href="record.author && record.author.html_url" target="_blank">{{ record.commit.author.name }}</a>
                        at
                        <span class="commit-time">{{ record.commit.author.date.replace(/T|Z/g, ' ') }}</span>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import axios from 'axios'
export default defineComponent({
    name: 'function-github',
    setup() {
        const apiURL = 'https://api.github.com/repos/sky124380729/levi-vue-admin/commits?per_page=8&sha='
        const branchs = ref(['master', 'dev'])
        const commits = ref([])
        const loading = ref(false)
        const fetchData = () => {
            loading.value = true
            axios.get(apiURL + currentBranch.value).then((res) => {
                commits.value = res.data
                loading.value = false
            })
        }
        const truncate = (v: string) => {
            const newLine = v.indexOf('\n')
            return newLine > 0 ? v.slice(0, newLine) : v
        }
        const currentBranch = ref('master')
        watch(currentBranch, () => {
            fetchData()
        })
        fetchData()
        return {
            loading,
            branchs,
            currentBranch,
            commits,
            truncate
        }
    }
})
</script>

<style lang="less" scoped>
.github {
    .project-url {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0;
        padding-left: 6px;
    }
    .commit-link {
        font-weight: bolder;
        color: #e40e0e;
    }
    .author-info {
        padding-left: 10px;
    }
    .author-link {
        font-weight: bolder;
        color: #76b117;
        margin: 0 4px;
    }
    .commit-time {
        font-size: 12px;
        color: #84167b;
    }
}
</style>
