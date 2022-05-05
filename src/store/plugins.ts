import { defineStore } from 'pinia'
import { fetchServePlugins } from '../service/modules/plugins'

import { plugins } from '../types/allTypes'

export const usePluginDStore = defineStore('plugins', {
    state: () => {
        return { plugins: {} as plugins }
    },

    getters: {
        getPlugins: (state) => state.plugins,
    },

    actions: {
        async fetchPlugins() {
            await fetchServePlugins().then(({ data }) => (this.plugins = data))
        },
    },
})
