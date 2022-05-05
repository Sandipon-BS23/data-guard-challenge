import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { plugins } from '../../types/allTypes'

const fetchServePlugins = (): Promise<AxiosResponse<plugins>> => {
    return useAxios.get('/api/plugins').then((response) => {
        return response
    })
}

export { fetchServePlugins }
