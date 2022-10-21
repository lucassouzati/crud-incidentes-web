import axios, { AxiosError } from 'axios'

export default function setupApiClient(){
    const api = axios.create({
        baseURL: 'http://localhost/api',
      })

      return api
}