<template>
    <div class="bg-white shadow px-8 py-5 h-16 flex">
        <button @click="emit('onMenuClicked')" class="md:hidden pr-5">
            <BrandIcon name="bars" />
        </button>
        <span class="text-xl">
            {{ router.currentRoute.value.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import BrandIcon from '../components/BrandIcon.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits(['onMenuClicked'])
</script>

<style scoped></style>
