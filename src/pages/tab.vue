<template>
    <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
        <div v-for="(value, i) in availablePlugins" :key="i" class="">
            <!-- {{ value }} -->
            <PluginCard v-model="_control" :pluginData="value" />
        </div>
    </div>
    {{ pluginStore.getPlugins }}
    <pre>
    {{ tabStore.getTabs }}
    </pre>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import { usePluginDStore } from '../store/plugins'
import { useTabStore } from '../store/tabs'

import PluginCard from '../components/modules/plugins/PluginCard.vue'

/*
    Routes Properties
*/
const route = useRoute()
const currentTab = computed(() => route.params.tab)

const _control = ref(false)

/*
    Pinia Store
*/

const pluginStore = usePluginDStore()
pluginStore.fetchPlugins()
const tabStore = useTabStore()
tabStore.fetchTabs()

/*
    Computed Properties
*/

const specificTab = computed(() => {
    const tabData = Object.values(tabStore.getTabs).find((t) => {
        const cTab = currentTab.value as String
        return t.title.toLowerCase() === cTab.toLowerCase()
    })
    return tabData
})

const availablePlugins = computed(() => {
    const filteredPlugins = {}

    Object.entries(pluginStore.getPlugins).forEach(([key, value]) => {
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
</script>

<style lang="stylus" scoped></style>
