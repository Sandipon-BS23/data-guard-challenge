<template>
    <div
        class="w-80 bg-gray-100 absolute insert-y-0 left-0 transform -translate-x-full md:relative md:-translate-x-0"
        :class="{ 'relative -translate-x-0': modelControl }"
    >
        <div class="pt-4 pb-2 px-6">
            <a href="#!">
                <div class="flex items-center">
                    <BrandIcon class="w-40 h-16 pl-2" name="logo" />
                </div>
            </a>
        </div>

        <ul class="p-0">
            <li v-for="(link, i) in navLinks" :key="i">
                <NavItem :to="link.to">
                    <template v-slot:icon>
                        <BrandIcon class="w-8 h-8 mr-3" :name="link.icon" />
                    </template>
                    <template v-slot:text>
                        <span class="capitalize">
                            {{ link.title }}
                        </span>
                    </template>
                </NavItem>
            </li>
        </ul>

        <div
            class="text-center bottom-0 absolute w-full"
            :class="
                AllStatus
                    ? 'bg-gradient-to-t from-green-300 to-transparent'
                    : 'bg-gradient-to-t from-red-300 to-transparent'
            "
        >
            <div
                class="flex items-center justify-center w-full mb-0 mt-0 pb-10"
            >
                <label
                    for="all-status-section-id"
                    class="flex items-center cursor-pointer"
                >
                    <div class="mr-3 text-gray-700 font-medium">
                        All plugins
                        {{ `${AllStatus ? 'enabled' : 'disabled'}` }}
                    </div>
                    <div class="relative">
                        <input
                            v-model="AllStatus"
                            type="checkbox"
                            id="all-status-section-id"
                            class="sr-only"
                        />

                        <div
                            class="line block bg-red-600 w-14 h-8 rounded-full"
                        />

                        <div
                            class="dot absolute left-1 top-1 text-red-500 bg-white w-6 h-6 rounded-full transition"
                        >
                            <BrandIcon v-if="AllStatus" name="checkCircle" />
                            <BrandIcon v-else name="cross-circle" />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue'
import BrandIcon from '../components/BrandIcon.vue'
import { computed, ref } from 'vue'

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

const AllStatus = ref(true)

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input:checked ~ .dot {
    @apply text-green-500 bg-white translate-x-full;
}
input:checked ~ .line {
    @apply text-green-500 bg-green-500;
}

.green-to-white {
    @apply text-green-500 bg-green-500;
}
</style>
