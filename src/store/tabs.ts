import { defineStore } from 'pinia'
import { fetchServeTabs } from '../service/modules/tabs'

import { tabs } from '../types/allTypes'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return { tabs: {} as tabs }
    },

    getters: {
        getTabs: (state) => state.tabs,
    },

    actions: {
        async fetchTabs() {
            await fetchServeTabs().then(({ data }) => (this.tabs = data))
        },
    },
})
