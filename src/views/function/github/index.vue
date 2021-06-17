<template>
    <div class="github">
        <h1 class="title">Last Levi-vue-admin commits</h1>
        <h2 class="subtitle">
            <span>lastBuildTime:{{ lastBuildTime }}</span> <span>version:{{ version }}</span>
        </h2>
        <a-radio-group v-model:value="currentBranch" button-style="solid">
            <a-radio-button v-for="item in branchs" :key="item" :value="item">{{ item }}</a-radio-button>
        </a-radio-group>
        <p class="project-url">sky124380729/levi-vue-admin@{{ currentBranch }}</p>
        <a-spin :spinning="loading">
            <a-timeline>
                <a-timeline-item v-for="record in commits" :key="record.sha">
                    <a class="commit-link" :href="record.html_url" target="_blank">{{ record.sha.slice(0, 12) }}...</a> - <span>{{ truncate(record.commit.message) }}</span>
                    <div class="author-info">
                        by
                        <a class="author-link" :href="record.author && record.author.html_url" target="_blank">{{ record.commit.author.name }}</a>
                        at
                        <span class="commit-time">{{ formateDate(record.commit.author.date) }}</span>
                    </div>
                </a-timeline-item>
            </a-timeline>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import axios from 'axios'
export default defineComponent({
    name: 'function-github',
    setup() {
        const { lastBuildTime, pkg } = __APP_INFO__
        const { version } = pkg

        const apiURL = 'https://api.github.com/repos/sky124380729/levi-vue-admin/commits?per_page=8&sha='
        const branchs = ref(['master', 'dev'])
        const commits = ref<any[]>([])
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
        const formateDate = (v: string) => {
            return new Date(v).toLocaleString()
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
            truncate,
            formateDate,
            lastBuildTime,
            version
        }
    }
})
</script>

<style lang="less" scoped>
.github {
    background-color: #fff;
    min-height: 400px;
    padding: 20px;
    .subtitle {
        font-size: 14px;
        margin-bottom: 20px;
        color: #0dacdc;
        span {
            margin-right: 20px;
        }
    }
    .project-url {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0;
        padding-left: 6px;
    }
    .commit-link {
        font-weight: bolder;
        color: #ef5800;
    }
    .author-info {
        padding-left: 10px;
    }
    .author-link {
        font-weight: bolder;
        color: #0dacdc;
        margin: 0 4px;
        text-shadow: 1px 1px 1px #ffd60a;
    }
    .commit-time {
        font-size: 12px;
        color: #84167b;
    }
}
</style>
