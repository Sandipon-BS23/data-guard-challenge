<template>
    <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
        <div v-for="(value, i) in availablePlugins" :key="i" class="">
            <!-- {{ value }} -->
            <PluginCard v-model="_control" :pluginData="value" />
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import PluginCard from '../components/PluginCard.vue'

const route = useRoute()
const currentTab = computed(() => route.params.tab)

/*
    api calls
*/
const plugins = ref({})
axios.get('/api/plugins').then((response) => {
    plugins.value = response.data
})

type tab = {
    title: String
    icon: String
    active: String[]
    disabled: String[]
    inactive: String[]
}

const tabs = ref([] as tab[])
axios.get('/api/tabdata').then((response) => {
    tabs.value = response.data
})

const specificTab = computed(() => {
    const tabData = Object.values(tabs.value).find((t) => {
        const cTab = currentTab.value as String
        return t.title.toLowerCase() === cTab.toLowerCase()
    }) as tab
    return tabData
})

const availablePlugins = computed(() => {
    const filteredPlugins = {}

    Object.entries(plugins.value).forEach(([key, value]) => {
        if (specificTab.value) {
            const TabActive = specificTab.value.active as String[]
            const TabDisabled = specificTab.value.disabled as String[]
            const TabInactive = specificTab.value.inactive as String[]

            if (TabActive.includes(key)) {
                filteredPlugins[key] = {
                    pluginInfo: value,
                    active: true,
                    disabled: false,
                    inactive: false,
                }
            }

            if (TabDisabled.includes(key)) {
                filteredPlugins[key] = {
                    pluginInfo: value,
                    active: false,
                    disabled: true,
                    inactive: false,
                }
            }

            if (TabInactive.includes(key)) {
                filteredPlugins[key] = {
                    pluginInfo: value,
                    active: false,
                    disabled: false,
                    inactive: true,
                }
            }
        }
    })

    return filteredPlugins
})

const _control = ref(false)
</script>

<style lang="stylus" scoped></style>
