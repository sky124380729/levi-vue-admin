<template>
    <lv-charts :options="options" :height="800"></lv-charts>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
    name: 'platform',
    setup() {
        let options = ref({})

        function getLevelOption() {
            return [
                {
                    itemStyle: {
                        borderWidth: 0,
                        gapWidth: 5
                    }
                },
                {
                    itemStyle: {
                        gapWidth: 1
                    }
                },
                {
                    colorSaturation: [0.35, 0.5],
                    itemStyle: {
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            ]
        }

        onMounted(() => {
            import('./disk.tree.json').then(({ default: diskData }) => {
                options.value = {
                    title: {
                        text: 'Disk Usage',
                        left: 'center'
                    },
                    series: [
                        {
                            name: 'Disk Usage',
                            type: 'treemap',
                            visibleMin: 300,
                            label: {
                                show: true,
                                formatter: '{b}'
                            },
                            itemStyle: {
                                borderColor: '#fff'
                            },
                            levels: getLevelOption(),
                            data: diskData
                        }
                    ]
                }
            })
        })
        return {
            options
        }
    }
})
</script>
