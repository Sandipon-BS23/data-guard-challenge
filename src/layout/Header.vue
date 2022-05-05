<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useTabStore } from '../store/tabs'
import BrandIcon from '../components/brand/BrandIcon.vue'

const route = useRoute()

const getCurrentTabTitle = computed(() => {
    const _tabData = useTabStore().getTabs[route.params.tab as string]
    return _tabData ? _tabData.title : ''
})

const emit = defineEmits(['onMenuClicked'])
</script>

<template>
    <div class="bg-white px-8 py-5 h-16 flex">
        <button @click="emit('onMenuClicked')" class="md:hidden pr-5">
            <BrandIcon name="bars" />
        </button>
        <span class="text-xl capitalize" v-if="getCurrentTabTitle">
            {{ getCurrentTabTitle }} Plugins
        </span>
    </div>
</template>
