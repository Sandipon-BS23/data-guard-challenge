<template>
    <div
        class="w-80 bg-gray-100 absolute insert-y-0 left-0 transform -translate-x-full md:relative md:-translate-x-0"
        :class="{ 'relative -translate-x-0': sideBarControl }"
    >
        <div class="pt-4 pb-2 px-6">
            <a href="#!">
                <div class="flex items-center">
                    <BrandIcon class="w-40 h-16 pl-2" name="logo" />
                </div>
            </a>
        </div>

        <!-- Sidebar Navigation Items -->
        <ul class="p-0" v-if="Object.keys(tabStore.getTabs).length > 0">
            <li v-for="(value, name, index) in tabStore.getTabs" :key="index">
                <NavItem :to="name.toString()">
                    <template v-slot:icon>
                        <BrandIcon class="w-8 h-8 mr-3" :name="value.icon" />
                    </template>
                    <template v-slot:text>
                        <span class="capitalize">
                            {{ value.title }}
                        </span>
                    </template>
                </NavItem>
            </li>
        </ul>

        <!-- Bottom Section  -->
        <ToggleAll />
    </div>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue'
import BrandIcon from '../components/brand/BrandIcon.vue'
import { computed, ref } from 'vue'
import { useTabStore } from '../store/tabs'
import ToggleAll from './ToggleAll.vue'

/* 
 Pinia Store
*/
const tabStore = useTabStore()

/*
    This is to control the sidebar. 
    User of this component can show or hide it via v-model
*/
const props = defineProps(['modelValue'])
const sideBarControl = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
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
