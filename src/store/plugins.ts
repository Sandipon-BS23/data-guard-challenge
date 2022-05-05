import { defineStore } from 'pinia'
import { fetchDbPlugins } from '../service/modules/plugins'

import { PluginsType } from '../types'

export const usePluginStore = defineStore('plugins', {
    state: () => {
        return { plugins: {} as PluginsType }
    },

    getters: {
        getPlugins: (state) => state.plugins,
    },

    actions: {
        async fetchPlugins() {
            await fetchDbPlugins().then(({ data }) => (this.plugins = data))
        },
    },
})
