<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { usePluginStore } from '../store/plugins'
import { useTabStore } from '../store/tabs'

import { TabType, TabPluginsType } from '../types/index'

import PluginCard from '../components/modules/plugins/PluginCard.vue'

/*
    Routes Properties
*/
const route = useRoute()
const router = useRouter()
const currentRouteTabKey = computed(() => route.params.tab as string)

/*
    Pinia Store
*/

const pluginStore = usePluginStore()
const tabStore = useTabStore()

const currentTab = computed((): TabType => {
    const currentTabData: TabType = tabStore.getTabs[currentRouteTabKey.value]

    // incase invalid url,
    // in best case, this should be taken care at navigation guard level
    // for now just leaving this logic here.
    if (!currentTabData) router.push({ path: '/tab1' })

    return currentTabData as TabType
})

/**
 * This is a helper function for the below computed property.
 *
 * @param {TabPluginsType} fArray     - Filtered Object of plugins.
 * @param {string} pKey               - Plugin Key.
 * @param {string} tKey               - Tab Key.
 * @param {boolean} disable           - Disable Status.
 * @param {boolean} status            - Active/Inactive status. True if active, False if inactive.
 *
 * @returns {TabPluginsType}  - A list of all tab data.
 */
const updateObj = (
    fArray: TabPluginsType,
    pKey: string,
    tKey: string,
    disable: boolean,
    status: boolean
) => {
    fArray[pKey] = {
        pluginKey: pKey,
        tabKey: tKey,
        disable: disable,
        status: status,
    }
    return fArray
}

/**
 * @returns {TabPluginsType} A list of plugins that is available for the current tab.
 */
const availablePlugins = computed(() => {
    const _fPlugins: TabPluginsType = {}
    const _tabKey = currentRouteTabKey.value
    if (currentTab.value) {
        Object.keys(pluginStore.getPlugins).forEach((_pluginKey) => {
            /**
             * Extracting main three types of array in separate variables.
             */
            const TabActive = currentTab.value.active as String[]
            const TabDisabled = currentTab.value.disabled as String[]
            const TabInactive = currentTab.value.inactive as String[]

            /**
             * Checking if the plugin key exists in the Disabled Array.
             * Checking "disabled array" data first can be a better approach,
             * as the same keys that belongs in "disabled array" can exists also exists in "active or inactive arrays" too.
             */
            if (TabDisabled.includes(_pluginKey)) {
                updateObj(_fPlugins, _pluginKey, _tabKey, true, true)
            }

            /**
             * Checking active/inactive arrays,
             * assuming if a plugin key is in active array, if should not belong to the inactive array.
             */
            if (TabActive.includes(_pluginKey)) {
                /**
                 * If the key already exist, only the status can be updated.
                 */
                if (_fPlugins[_pluginKey]) {
                    _fPlugins[_pluginKey].status = true
                } else {
                    updateObj(_fPlugins, _pluginKey, _tabKey, false, true)
                }
            } else {
                if (TabInactive.includes(_pluginKey)) {
                    /**
                     * If the key already exist, only the status can be updated.
                     */
                    if (_fPlugins[_pluginKey]) {
                        _fPlugins[_pluginKey].status = false
                    } else {
                        updateObj(_fPlugins, _pluginKey, _tabKey, false, false)
                    }
                }
            }
        })
    }

    /**
     * returning filtered plugins
     */
    return _fPlugins
})
</script>

<template>
    <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        v-if="Object.keys(availablePlugins).length > 0"
    >
        <div v-for="(plugin, i) in availablePlugins" :key="i" class="">
            <PluginCard
                :plugin="plugin.pluginKey"
                :tab="plugin.tabKey"
                :status="plugin.status"
                :disable="plugin.disable"
            />
        </div>
    </div>
</template>
