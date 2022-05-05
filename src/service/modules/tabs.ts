import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { TabsType } from '../../types/allTypes'

const fetchServerTabs = (): Promise<AxiosResponse<TabsType>> => {
    return useAxios.get('/api/tabdata').then((response) => {
        return response
    })
}

const updateServerTabStatus = ({
    tab,
    type,
    value,
}): Promise<AxiosResponse<TabsType>> => {
    return useAxios
        .post(`/api/tabdata/${tab}`, { type: type, value: value })
        .then((response) => {
            return response
        })
}

const disableServerPluginStatus = ({ isEnable }): Promise<void> => {
    return useAxios
        .post(`/api/tabdata/disable/all`, { isEnable: isEnable })
        .then((response) => {
            console.log('response:', response)
        })
}

export { fetchServerTabs, updateServerTabStatus, disableServerPluginStatus }
