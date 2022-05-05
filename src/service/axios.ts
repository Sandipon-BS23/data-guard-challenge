import axios, { AxiosInstance } from 'axios'
/**
 * This is a singleton instance of the Axios.
 * More configuration can be added here.
 */
const useAxios: AxiosInstance = axios.create({
    // baseURL: '',
})

export default useAxios
