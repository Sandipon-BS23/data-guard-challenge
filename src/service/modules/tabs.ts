import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { TabsType } from '../../types/allTypes'

const fetchServeTabs = (): Promise<AxiosResponse<TabsType>> => {
    return useAxios.get('/api/tabdata').then((response) => {
        return response
    })
}

export { fetchServeTabs }
