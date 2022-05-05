<script setup lang="ts">
import BrandIcon from '../../components/brand/BrandIcon.vue'
import { useSlots, computed, ref } from 'vue'
const slots = useSlots()

const ifLabelSlot = computed(() => {
    return slots.label ? true : false
})

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },

    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },

    large: {
        type: Boolean,
        required: false,
        default: false,
    },

    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
})

const modelControl = computed({
    get: () => props.modelValue as boolean,
    set: (value) => {
        emit('update:modelValue', value)
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', checked: boolean): void
}>()
</script>

<template>
    <div
        class="flex items-end justify-end w-full mb-0 mt-0 pb-0"
        :class="disabled ? 'opacity-50' : ''"
    >
        <div class="grid" :class="ifLabelSlot ? 'grid-rows-2' : 'grid-rows-1'">
            <label class="flex items-end cursor-pointer pl-1">
                <div class="relative">
                    <input
                        v-model="modelControl"
                        type="checkbox"
                        class="sr-only"
                        :disabled="disabled"
                    />

                    <div
                        class="line block bg-red-600 rounded-full"
                        :class="large ? 'w-14 h-8' : 'w-10 h-6'"
                    />

                    <div
                        class="dot absolute left-1 top-1 text-red-500 bg-white rounded-full transition"
                        :class="large ? 'w-6 h6' : 'w-4 h-4'"
                    >
                        <slot v-if="!loading" name="icon" />
                        <BrandIcon
                            v-else
                            class="animate-spin"
                            :class="{ 'm-1': large }"
                            name="loading"
                        />
                    </div>
                </div>
            </label>
            <div
                class="text-xs font-bold"
                :class="modelControl ? 'text-green-500' : 'text-red-500'"
            >
                <slot name="label" />
            </div>
        </div>
    </div>
</template>

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
