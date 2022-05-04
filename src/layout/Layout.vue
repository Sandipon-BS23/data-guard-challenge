<template>
    <div class="relative flex min-h-screen">
        <!-- sidebar -->
        <SideBar v-model="SideBarControl" />

        <!-- main content  -->
        <div class="flex-1">
            <!-- header -->
            <Header @onMenuClicked="SideBarControl = !SideBarControl" />
            <Content />
            <!-- content -->
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue'
import Header from './Header.vue'
import Content from './Content.vue'
import { ref } from 'vue'
const SideBarControl = ref(false)
</script>

<style scoped></style>
