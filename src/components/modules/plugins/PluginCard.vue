<template>
    <div
        class="bg-grey-200 p-5 border-solid border-2 border-grey-500 rounded-md h-48 overflow-hidden"
        :class="props.disable ? 'card-disable' : ''"
    >
        <div class="grid">
            <div class="flex flex-row h-16">
                <div class="basis-1/2">{{ pluginData.title }}</div>
                <div class="basis-1/2 text-right">
                    <BaseSwitch v-model="cardStatus" :disabled="disable">
                        <template v-slot:label>
                            {{ `${cardStatus ? 'Allowed' : 'Blocked'}` }}
                        </template>
                    </BaseSwitch>
                </div>
            </div>

            <span class="">{{ pluginData.description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue'
import BaseSwitch from '../../base/BaseSwitch.vue'
import { PluginType } from '../../../types/allTypes'

const props = defineProps({
    pluginData: {
        type: Object as PropType<PluginType>,
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

const cardStatus = computed({
    get: () => {
        return props.status
    },
    set: (value) => {
        console.log('value >>:', value)
        // axios
        //     .post('/api/tabdata/tab3', { type: 'inactive', value: 'plugin11' })
        //     .then((response) => {
        //         console.log('response:', response)
        //         // fakeData.value = response.data
        //     })
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
