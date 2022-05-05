<template>
    <div
        class="text-center bottom-0 absolute w-full"
        :class="
            allStatus
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
                    {{ `${allStatus ? 'enabled' : 'disabled'}` }}
                </div>
                <div class="relative">
                    <BaseSwitch v-model="allStatus" large :loading="isLoading">
                        <template v-slot:icon>
                            <BrandIcon v-if="allStatus" name="checkCircle" />
                            <BrandIcon v-else name="cross-circle" />
                        </template>
                    </BaseSwitch>
                </div>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BrandIcon from '../components/brand/BrandIcon.vue'
import BaseSwitch from '../components/base/BaseSwitch.vue'
import { useTabStore } from '../store/tabs'
import { disableServerPluginStatus } from '../service/modules/tabs'

const tabStore = useTabStore()

console.log(tabStore.getTabs)

const allStatus = ref(true)
const isLoading = ref(false)

watch(allStatus, (val) => {
    isLoading.value = true
    disableServerPluginStatus({
        isEnable: !val,
    }).then(() => {
        tabStore.fetchTabs().then(() => {
            isLoading.value = false
        })
    })
})
</script>

<style lang="stylus" scoped></style>
