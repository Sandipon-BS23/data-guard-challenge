import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { PluginsType } from '../../types'

/**
 * @returns {PluginsType} - Returns list of all plugin data.
 */
const fetchDbPlugins = (): Promise<AxiosResponse<PluginsType>> => {
    return useAxios.get('/api/plugins').then((response) => {
        return response
    })
}

export { fetchDbPlugins }
