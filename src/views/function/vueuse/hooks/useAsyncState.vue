<template>
    <div>
        <p>Ready: {{ isReady.toString() }}</p>
        <pre lang="json" class="ml-2">{{ YAML.dump(state) }}</pre>
        <button @click="execute(2000)">Execute</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import YAML from 'js-yaml'
import { defineComponent } from 'vue'
import { useAsyncState } from '@vueuse/core'

export default defineComponent({
    setup() {
        const { state, isReady, execute } = useAsyncState(
            () => axios.get('https://jsonplaceholder.typicode.com/todos/1').then((t) => t.data),
            {},
            {
                delay: 2000,
                resetOnExecute: false
            }
        )
        return {
            YAML,
            state,
            isReady,
            execute
        }
    }
})
</script>
