<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue'
import BaseSwitch from '../../base/BaseSwitch.vue'
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
        tabStore
            .updateTabStatus(
                props.tab,
                value ? 'active' : 'inactive',
                props.plugin
            )
            .then(() => {
                isLoading.value = false
            })
    },
})
</script>

<template>
    <div
        class="bg-grey-200 p-5 border-solid border-2 border-grey-500 rounded-md h-48 overflow-hidden"
        :class="{ 'card-disable': props.disable }"
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

<style scoped>
.card-disable {
    opacity: 0.5;
    pointer-events: none;
}
</style>
