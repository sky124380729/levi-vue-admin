<template>
    <pre>{{ code }}</pre>
</template>

<script lang="ts">
import { usePermission } from '@vueuse/core'
import { defineComponent, computed, reactive } from 'vue'
import YAML from 'js-yaml'
export default defineComponent({
    setup() {
        const geolocation = usePermission('geolocation')
        const microphone = usePermission('microphone')
        const notifications = usePermission('notifications')
        const camera = usePermission('camera')
        const midi = usePermission('midi')

        const code = computed(() =>
            YAML.dump(
                reactive({
                    geolocation,
                    microphone,
                    notifications,
                    camera,
                    midi
                })
            )
        )
        return { code }
    }
})
</script>
