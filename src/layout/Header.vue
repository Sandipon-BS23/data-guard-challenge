<template>
    <div class="bg-white px-8 py-5 h-16 flex">
        <button @click="emit('onMenuClicked')" class="md:hidden pr-5">
            <BrandIcon name="bars" />
        </button>
        <span class="text-xl capitalize"> {{ route.params.tab }} Plugins </span>
    </div>
</template>

<script setup lang="ts">
import BrandIcon from '../components/BrandIcon.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const emit = defineEmits(['onMenuClicked'])
</script>

<style scoped></style>
