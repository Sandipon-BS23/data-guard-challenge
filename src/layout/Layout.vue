<script setup lang="ts">
import { ref } from 'vue'

import SideBar from './SideBar/index.vue'
import Header from './Header.vue'
import Content from './Content.vue'

import { usePluginStore } from '../store/plugins'
import { useTabStore } from '../store/tabs'

const SideBarControl = ref(false)

/**
 * Fetching basic data at a very top level of the module.
 */

/** Plugin Store */
const pluginStore = usePluginStore()
pluginStore.fetchPlugins()

/** Tab Store */
const tabStore = useTabStore()
tabStore.fetchTabs()
</script>

<template>
    <div class="relative flex min-h-screen">
        <!-- sidebar -->
        <SideBar v-model="SideBarControl" />

        <!-- main content  -->
        <div class="flex-1">
            <!-- header -->
            <Header @onMenuClicked="SideBarControl = !SideBarControl" />
            <!-- content -->
            <Content />
        </div>
    </div>
</template>
