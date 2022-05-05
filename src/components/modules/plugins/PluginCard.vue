<template>
    <div
        class="bg-grey-200 p-5 border-solid border-2 border-grey-500 rounded-md h-48 overflow-hidden"
        :class="props.disable ? 'card-disable' : ''"
    >
        <div class="grid">
            <div class="flex flex-row h-16">
                <div class="basis-1/2">{{ pluginData.title }}</div>
                <div class="basis-1/2 text-right">
                    <BaseSwitch
                        v-model="cardStatus"
                        :disabled="disable || isLoading"
                        :loading="isLoading"
                    >
                        <template v-slot:label>
                            <span v-if="!isLoading">
                                {{ `${cardStatus ? 'Allowed' : 'Blocked'}` }}
                            </span>
                            <span v-else class="text-gray-500"> Loading </span>
                        </template>
                    </BaseSwitch>
                </div>
            </div>

            <span class="">{{ pluginData.description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, PropType, ref } from 'vue'
import BaseSwitch from '../../base/BaseSwitch.vue'
import { PluginType } from '../../../types/allTypes'
import { usePluginStore } from '../../../store/plugins'
import { useTabStore } from '../../../store/tabs'

const props = defineProps({
    plugin: {
        type: String,
        required: true,
    },
    tab: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    disable: {
        type: Boolean,
        required: true,
    },
})

/*
    Pinia Store
*/
const pluginStore = usePluginStore()
const pluginData = computed(() => pluginStore.getPlugins[props.plugin])
const tabStore = useTabStore()

const isLoading = ref(false)
const cardStatus = computed({
    get: () => {
        return props.status
    },
    set: (value) => {
        isLoading.value = true
        axios
            .post('/api/tabdata/' + props.tab, {
                type: value ? 'active' : 'inactive',
                value: props.plugin,
            })
            .then((response) => {
                tabStore.fetchTabs().then(() => {
                    isLoading.value = false
                })
            })
    },
})

// const modelControl = computed({
//     get: () => props.modelValue as boolean,
//     set: (value) => {
//         console.log('her ??value:', value)
//         emit('update:modelValue', value as boolean)
//     },
// })

// const emit = defineEmits<{
//     (e: 'update:modelValue', checked: boolean): void
// }>()
</script>

<style scoped>
.card-disable {
    opacity: 0.5;
    pointer-events: none;
}
</style>
