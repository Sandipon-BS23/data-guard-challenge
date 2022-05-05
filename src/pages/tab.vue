<template>
    <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        v-if="Object.keys(availablePlugins).length > 0"
    >
        <div v-for="(plugin, i) in availablePlugins" :key="i" class="">
            <PluginCard
                :status="plugin.status"
                :pluginData="plugin.info"
                :disable="plugin.disable"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { usePluginDStore } from '../store/plugins'
import { useTabStore } from '../store/tabs'

import { TabPluginsType } from '../types/allTypes'

import PluginCard from '../components/modules/plugins/PluginCard.vue'

/*
    Routes Properties
*/
const route = useRoute()
const router = useRouter()
const currentTab = computed(() => route.params.tab as string)

const _control = ref(false)

/*
    Pinia Store
*/

const pluginStore = usePluginDStore()
const tabStore = useTabStore()

/*
    Computed Properties
*/

const specificTab = computed(() => {
    let currentTabData = tabStore.getTabs[currentTab.value]

    // incase invalid url, in best case, this should be taken care at navigation guard level, for now just leaving this logic here.
    if (!currentTabData) router.push({ path: '/tab1' })

    return currentTabData
})

const availablePlugins = computed(() => {
    const filteredPlugins: TabPluginsType = {}

    Object.entries(pluginStore.getPlugins).forEach(([key, value]) => {
        if (specificTab.value) {
            const TabActive = specificTab.value.active as String[]
            const TabDisabled = specificTab.value.disabled as String[]
            const TabInactive = specificTab.value.inactive as String[]

            if (TabActive.includes(key)) {
                filteredPlugins[key] = {
                    info: value,
                    disable: false,
                    status: true,
                    tab: currentTab.value,
                }
            }

            if (TabDisabled.includes(key)) {
                filteredPlugins[key] = {
                    info: value,
                    disable: true,
                    status: true,
                    tab: currentTab.value,
                }
            }

            if (TabInactive.includes(key)) {
                filteredPlugins[key] = {
                    info: value,
                    disable: false,
                    status: false,
                    tab: currentTab.value,
                }
            }
        }
    })

    return filteredPlugins
})
</script>

<style lang="stylus" scoped></style>
