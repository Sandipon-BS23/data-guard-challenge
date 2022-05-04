<template>
    <!-- h-full shadow-md bg-white bg-slate-50 absolute -->
    <div
        class="w-60 shadow-md bg-slate-50 absolute insert-y-0 left-0 transform -translate-x-full md:relative md:-translate-x-0"
        :class="{ 'relative -translate-x-0': modelControl }"
    >
        <div class="pt-4 pb-2 px-6">
            <a href="#!">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                            class="rounded-full w-10"
                            alt="Avatar"
                        />
                    </div>
                    <div class="grow ml-3">
                        <p class="text-sm font-semibold text-blue-600">
                            Jason McCoel
                        </p>
                    </div>
                </div>
            </a>
        </div>
        <hr />
        <ul class="px-1">
            <li v-for="(link, i) in navLinks" :key="i" class="">
                <NavItem :to="link.to">
                    <template v-slot:icon>
                        <!-- <IconGlobe /> -->
                        <component :is="IconGlobe" />
                    </template>
                    <template v-slot:text> {{ link.title }} </template>
                </NavItem>
            </li>
        </ul>

        <div class="text-center bottom-0 absolute w-full">
            <hr class="m-0" />
            <p class="py-2 text-sm text-gray-700">tailwind-elements.com</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue'
import IconGlobe from '../components/icons/globe.vue'
import { computed } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const modelControl = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
const navLinks = [
    {
        title: 'marketing',
        to: '/marketing',
        icon: 'IconGlobe',
    },
    {
        title: 'finance',
        to: '/finance',
        icon: 'IconGlobe',
    },
]
</script>

<style scoped></style>
