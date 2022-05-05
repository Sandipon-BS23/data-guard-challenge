import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { PluginsType } from '../../types/allTypes'

const fetchServePlugins = (): Promise<AxiosResponse<PluginsType>> => {
    return useAxios.get('/api/plugins').then((response) => {
        return response
    })
}

export { fetchServePlugins }
