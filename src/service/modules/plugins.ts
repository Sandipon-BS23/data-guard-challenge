import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { PluginsType } from '../../types/allTypes'

/**
 * @returns {PluginsType} A list of all plugins data.
 */
const fetchDbPlugins = (): Promise<AxiosResponse<PluginsType>> => {
    return useAxios.get('/api/plugins').then((response) => {
        return response
    })
}

export { fetchDbPlugins }
