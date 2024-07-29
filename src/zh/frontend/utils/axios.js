import axios from 'axios'

const BASE_URL = 'https://mu-api.yuk0.com/'



export const request = createBaseInstance()
mixinLoading(request.interceptors)
// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleError(e) {
  // confirm(e.message, '出错啦~')
  throw e
}

function handleResponse(response) {
  return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    if (!loading) {
      // loading = Loading.service({
      //   target: 'body',
      //   background: 'transparent',
      //   text: '载入中',
      // })
    }
    loadingCount++

    return config
  }


  function loadingResponseInterceptor(response) {
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}
