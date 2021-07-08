<template>
    <a-page-header>
        {{ t('hello') }}
        <a-form>
            <a-form-item :label="t('language')">
                <a-select v-model:value="locale">
                    <a-select-option value="zh">zh</a-select-option>
                    <a-select-option value="en">en</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-page-header>
</template>

<script>
import { computed, getCurrentInstance, ref } from 'vue'
export default {
    name: 'function-vitePlugins',
    setup() {
        const ctx = getCurrentInstance()

        const resource = ctx.type.i18n

        function useI18n() {
            const locale = ref('zh')
            const t = (val) => {
                return computed(() => resource[locale.value][val]).value
            }
            return { locale, t }
        }

        const { locale, t } = useI18n()

        return { locale, t }
    }
}
</script>

<i18n>
{
    "zh": {
        "language": "中文",
        "hello": "你好，世界！"
    },
    "en": {
        "language": "english",
        "hello": "Hello World!"
    }
}
</i18n>
