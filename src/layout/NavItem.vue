<template>
    <div>
        <router-link
            :to="to"
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
        >
            <slot name="icon"> </slot>
            <span>
                <slot name="text"> </slot>
            </span>
        </router-link>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    to: String,
})
</script>

<style scoped>
a.router-link-active {
    /* 
    @apply is to add tailwind css's classes.
    more at https://tailwindcss.com/docs/adding-custom-styles#adding-base-styles
    */
    @apply text-cyan-100 bg-cyan-600;
}
</style>
