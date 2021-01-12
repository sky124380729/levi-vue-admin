<template>
    <div>
        用户管理
        <a-input></a-input>
        <p>x:{{ x }}</p>
        <p>y:{{ y }}</p>

        <h1 v-if="loading">loading....</h1>
        <img v-if="loaded" :src="result.message" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useMousePosition from '/@/hooks/useMousePosition'
import useURLLoader from '/@/hooks/useURLLoader'
interface DogResult {
    message: string
    status: string
}
export default defineComponent({
    name: 'system-user',
    setup() {
        const { x, y } = useMousePosition()
        const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
        return { x, y, result, loading, loaded }
    }
})
</script>
