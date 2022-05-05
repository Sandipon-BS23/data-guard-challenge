<template>
    <div class="bg-white px-8 py-5 h-16 flex">
        <button @click="emit('onMenuClicked')" class="md:hidden pr-5">
            <BrandIcon name="bars" />
        </button>
        <span class="text-xl capitalize">
            {{ getCurrentTabTite }} Plugins
        </span>
    </div>
</template>

<script setup lang="ts">
import BrandIcon from '../components/brand/BrandIcon.vue'
import { useRoute } from 'vue-router'
import { useTabStore } from '../store/tabs'
import { computed } from 'vue'
const route = useRoute()

const emit = defineEmits(['onMenuClicked'])

const getCurrentTabTite = computed(() => {
    const _tabData = useTabStore().getTabs[route.params.tab as string]
    return _tabData ? _tabData.title : ''
})
</script>

<style scoped></style>
