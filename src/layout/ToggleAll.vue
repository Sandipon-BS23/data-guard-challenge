<template>
    <div
        class="text-center bottom-0 absolute w-full"
        :class="
            powerBtnStatus
                ? 'bg-gradient-to-t from-green-300 to-transparent'
                : 'bg-gradient-to-t from-red-300 to-transparent'
        "
    >
        <div class="flex items-center justify-center w-full mb-0 mt-0 pb-10">
            <label
                for="all-status-section-id"
                class="flex items-center cursor-pointer"
            >
                <div class="mr-3 text-gray-700 font-medium">
                    All plugins
                    {{ `${powerBtnStatus ? 'enabled' : 'disabled'}` }}
                </div>
                <div class="relative">
                    <BaseSwitch
                        v-model="powerBtnStatus"
                        large
                        :loading="isLoading"
                    >
                        <template v-slot:icon>
                            <BrandIcon
                                v-if="powerBtnStatus"
                                name="checkCircle"
                            />
                            <BrandIcon v-else name="cross-circle" />
                        </template>
                    </BaseSwitch>
                </div>
            </label>
        </div>
        <div class="text-xs opacity-50 px-5 pb-2">
            Assuming, when power button tries to enable all, previous state of
            disabled data still gets preserved.
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { useTabStore } from '../store/tabs'

import BrandIcon from '../components/brand/BrandIcon.vue'
import BaseSwitch from '../components/base/BaseSwitch.vue'

const powerBtnStatus = ref(true)

const tabStore = useTabStore()
const isLoading = ref(false)

watch(powerBtnStatus, (val) => {
    isLoading.value = true
    tabStore.toggleAllTabEnableDisable(val as boolean).then(() => {
        isLoading.value = false
    })
})
</script>
