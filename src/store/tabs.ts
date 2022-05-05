import { defineStore } from 'pinia'
import { fetchServeTabs } from '../service/modules/tabs'

import { TabsType } from '../types/allTypes'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return { tabs: {} as TabsType }
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
