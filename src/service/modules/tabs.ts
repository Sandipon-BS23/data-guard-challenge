import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { tabs } from '../../types/allTypes'

const fetchServeTabs = (): Promise<AxiosResponse<tabs>> => {
    return useAxios.get('/api/tabdata').then((response) => {
        return response
    })
}

export { fetchServeTabs }
