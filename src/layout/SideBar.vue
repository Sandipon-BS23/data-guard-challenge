<template>
    <div
        class="w-64 bg-gray-100 absolute insert-y-0 left-0 transform -translate-x-full md:relative md:-translate-x-0"
        :class="{ 'relative -translate-x-0': modelControl }"
    >
        <div class="pt-4 pb-2 px-6">
            <a href="#!">
                <div class="flex items-center">
                    <img class="w-40 h-16 pl-4" :src="logo" />
                </div>
            </a>
        </div>

        <ul class="p-0">
            <li v-for="(link, i) in navLinks" :key="i">
                <NavItem :to="link.to">
                    <template v-slot:icon>
                        <img class="w-8 h-8 mr-3" :src="getIcon(link.icon)" />
                    </template>
                    <template v-slot:text>
                        <span class="capitalize">
                            {{ link.title }}
                        </span>
                    </template>
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
import iconclipboard from '../components/icons/clipboard.vue'
import { computed } from 'vue'

import logo from '../assets/logo.svg'

const props = defineProps(['modelValue'])

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
        icon: 'qrcode',
    },
    {
        title: 'finance',
        to: '/finance',
        icon: 'euro',
    },
    {
        title: 'Personnel',
        to: '/personnel',
        icon: 'check',
    },
]

const getIcon = (icon: string) => {
    return '/src/assets/' + icon + '.svg'
}

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped></style>
