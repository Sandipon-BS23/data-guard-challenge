<template>
    <div class="flex items-end justify-end w-full mb-0 mt-0 pb-0">
        <div class="grid grid-rows-2">
            <label class="flex items-end cursor-pointer pl-1">
                <div class="relative">
                    <input
                        v-model="modelControl"
                        type="checkbox"
                        class="sr-only"
                    />

                    <div class="line block bg-red-600 w-10 h-6 rounded-full" />

                    <div
                        class="dot absolute left-1 top-1 text-red-500 bg-white w-4 h-4 rounded-full transition"
                    />
                </div>
            </label>
            <div
                class="text-xs font-bold"
                :class="modelControl ? 'text-green-500' : 'text-red-500'"
            >
                {{ `${modelControl ? 'Allowed' : 'Blocked'}` }} -
                {{ modelControl }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
})

const modelControl = computed({
    get: () => props.modelValue as boolean,
    set: (value) => emit('update:modelValue', value as boolean),
})

const emit = defineEmits<{
    (e: 'update:modelValue', checked: boolean): void
}>()
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
