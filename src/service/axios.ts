import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

type PromiseType = {
  onSuccess: (accessToken: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestsQueue: Array<PromiseType> = []

export function setupAPIClient() {
  const token = Cookies.get('meu-garcom-web.token')
  const api = axios.create({
    // 'http://localhost:3333',
    baseURL: 'https://api.meugarcon.com.br/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  async function signOut() {
    Cookies.remove('meu-garcom-web.token')
  }

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error?.response?.status === 498) {
        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .put('/auth/refresh-token')
            .then((response) => {
              const { accessToken } = response.data

              Cookies.set('meu-garcom-web.token', accessToken, {
                expires: 30,
                path: '/',
              })

              api.defaults.headers.Authorization = `Bearer ${accessToken}`

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(accessToken),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (accessToken: string) => {
              originalConfig.headers.Authorization = `Bearer ${accessToken}`
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
              signOut()
            },
          })
        })
      }
      return Promise.reject(error)
    },
  )

  return api
}
export function setupAPIProvider() {
  const token = Cookies.get('meu-garcom-web.provider.token')

  console.log('token => ', token)
  const api = axios.create({
    // 'http://localhost:3333',
    baseURL: 'https://api.meugarcon.com.br/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  async function signOut() {
    Cookies.remove('meu-garcom-web.provider.token')
  }

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error?.response?.status === 498) {
        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .put('/auth/refresh-token')
            .then((response) => {
              const { accessToken } = response.data

              Cookies.set('meu-garcom-web.provider.token', accessToken, {
                expires: 30,
                path: '/',
              })

              api.defaults.headers.Authorization = `Bearer ${accessToken}`

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(accessToken),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (accessToken: string) => {
              originalConfig.headers.Authorization = `Bearer ${accessToken}`
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
              signOut()
            },
          })
        })
      }
      return Promise.reject(error)
    },
  )

  return api
}
