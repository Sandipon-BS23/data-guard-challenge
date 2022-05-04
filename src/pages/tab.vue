<template>
    <div class="grid grid-cols-3 gap-4">
        <div
            v-for="(value, i) in availablePlugins"
            :key="i"
            class="bg-cyan-200 p-5"
        >
            {{ value }}
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const currentTab = computed(() => route.params.tab)

/*
    api calls
*/
const plugins = ref({})
axios.get('/api/plugins').then((response) => {
    plugins.value = response.data
})

type tab = {
    title: String
    icon: String
    active: String[]
    disabled: String[]
    inactive: String[]
}

const tabs = ref([] as tab[])
axios.get('/api/tabdata').then((response) => {
    tabs.value = response.data
})

const specificTab = computed(() => {
    const tabData = Object.values(tabs.value).find((t) => {
        const cTab = currentTab.value as String
        return t.title.toLowerCase() === cTab.toLowerCase()
    }) as tab
    return tabData
})

const availablePlugins = computed(() => {
    let mergedArray = [] as String[]
    if (specificTab.value) {
        const TabActive = specificTab.value.active as String[]
        const TabDisabled = specificTab.value.disabled as String[]
        const TabInactive = specificTab.value.inactive as String[]
        mergedArray = [...TabActive, ...TabDisabled, ...TabInactive]
    }

    const filteredPlugins = {}

    Object.entries(plugins.value).forEach(([key, value]) => {
        console.log('key, value:', key, value)
        if (mergedArray.includes(key)) {
            filteredPlugins[key] = value
        }
    })

    return filteredPlugins
})
</script>

<style lang="stylus" scoped></style>
