import { defineStore } from 'pinia'
import {
    fetchDbTabs,
    updateDbTabStatus,
    toggleAllDbTabEnableDisable,
} from '../service/modules/tabs'

import { TabsType } from '../types'

export const useTabStore = defineStore('tabs', {
    state: () => {
        return { tabs: {} as TabsType }
    },

    getters: {
        getTabs: (state) => state.tabs,
    },

    actions: {
        async fetchTabs() {
            await fetchDbTabs().then(({ data }) => (this.tabs = data))
        },

        async updateTabStatus(
            tabKey: string,
            actionType: 'active' | 'inactive',
            pluginKey: string | string[]
        ) {
            await updateDbTabStatus(tabKey, actionType, pluginKey).then(
                ({ data }) => (this.tabs = { ...this.tabs, ...data })
            )
        },

        async toggleAllTabEnableDisable(isEnable: boolean) {
            await toggleAllDbTabEnableDisable(isEnable).then(
                ({ data }) => (this.tabs = data)
            )
        },
    },
})
