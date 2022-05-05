<template>
    <div
        class="bg-grey-200 p-5 border-solid border-2 border-grey-500 rounded-md h-48 overflow-hidden"
        :class="statusCheck"
    >
        <div class="grid">
            <div class="flex flex-row h-16">
                <div class="basis-1/2">{{ pluginData.pluginInfo.title }}</div>
                <div class="basis-1/2 text-right">
                    <BaseSwitch v-model="modelControl" />
                </div>
            </div>

            <span class="">{{ pluginData.pluginInfo.description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue'
import BaseSwitch from './BaseSwitch.vue'

interface PluginInterface {
    pluginInfo: {
        title: String
        description: String
    }
    active: boolean
    disabled: boolean
    inactive: boolean
}

const props = defineProps({
    pluginData: {
        type: Object as PropType<PluginInterface>,
        required: true,
    },
    modelValue: {
        type: Boolean,
        required: true,
    },
})

const AllStatus = ref(true)

const statusCheck = computed((): string => {
    if (props.pluginData.active) return 'card-active'
    if (props.pluginData.disabled) return 'card-disabled'
    if (props.pluginData.inactive) return 'card-inactive'
    else return ''
})

onMounted(() => {
    AllStatus.value = props.pluginData.active
})

const modelControl = computed({
    get: () => props.modelValue as boolean,
    set: (value) => emit('update:modelValue', value as boolean),
})

// const emit = defineEmits(['update:modelValue'])
const emit = defineEmits<{
    (e: 'update:modelValue', checked: boolean): void
}>()
</script>

<style scoped>
.card-active {
}

.card-disabled {
    @apply opacity-40;
}
</style>
