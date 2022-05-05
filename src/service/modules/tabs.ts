import useAxios from '../axios'
import { AxiosResponse } from 'axios'

import { TabsType } from '../../types'

/**
 * @returns {TabsType} A list of all tab data.
 */
const fetchDbTabs = (): Promise<AxiosResponse<TabsType>> => {
    return useAxios.get('/api/tabdata').then((response) => {
        return response
    })
}

/**
 *
 * This is to update one specific tab.
 *
 * @param {string} tabKey                    - represents tab key from the tab data.
 * @param {'active' | 'inactive'} actionType - type can be either 'active' / 'inactive' to represent that action.
 * @param {string | string[]} pluginKey      - plugin key or array of plugin keys
 *
 * @returns {TabsType} A list of all tab data.
 */
const updateDbTabStatus = (
    tabKey: string,
    actionType: 'active' | 'inactive',
    pluginKey: string | string[]
): Promise<AxiosResponse<TabsType>> => {
    return useAxios
        .post(`/api/tabdata/${tabKey}`, { type: actionType, value: pluginKey })
        .then((response) => {
            return response
        })
}

/**
 *
 *  This is to toggle Enable Disable for each tab type for each plugins.
 *
 * @param {boolean} isEnable This function accepts an object with tab, type and value properties.
 *
 * @returns {TabsType} A list of all tab data.
 */
const toggleAllDbTabEnableDisable = (
    isEnable: boolean
): Promise<AxiosResponse<TabsType>> => {
    return useAxios
        .post(`/api/tabdata/disable/all`, { isEnable: isEnable })
        .then((response) => {
            return response
        })
}

export { fetchDbTabs, updateDbTabStatus, toggleAllDbTabEnableDisable }
