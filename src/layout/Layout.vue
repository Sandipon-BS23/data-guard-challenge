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

<script setup lang="ts">
import SideBar from './SideBar.vue'
import Header from './Header.vue'
import Content from './Content.vue'
import { ref } from 'vue'

import { usePluginStore } from '../store/plugins'
import { useTabStore } from '../store/tabs'

const SideBarControl = ref(false)

const pluginStore = usePluginStore()
pluginStore.fetchPlugins()
const tabStore = useTabStore()
tabStore.fetchTabs()
</script>

<style scoped></style>
