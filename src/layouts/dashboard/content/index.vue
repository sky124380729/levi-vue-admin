<template>
    <router-view>
        <template #default="{ Component, route }">
            <transition :name="route.meta.fullscreen ? '' : 'fade-slide'" mode="out-in" appear>
                <keep-alive :include="cachedViews">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </template>
    </router-view>
</template>

<script lang="ts">
import { computed } from 'vue'
import { defineComponent } from 'vue'
import store from '/@/store'

export default defineComponent({
    setup() {
        const cachedViews = computed(() => store.getters.getCachedViews)
        return {
            cachedViews
        }
    }
})
</script>
