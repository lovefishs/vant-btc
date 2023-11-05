import axios from 'axios'

const API_BASEURL = '/api/v1'
const API_TIMEOUT = 30 * 1000

let cancel: any = {}
let promiseArr: any = {}
const CancelToken = axios.CancelToken
const defaultRequest = axios.create({
  baseURL: API_BASEURL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
defaultRequest.interceptors.request.use(
  (config: any) => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
defaultRequest.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }

    console.error(err.message)

    return Promise.resolve(err.response)
  }
)

export function getHttp(request: any) {
  return {
    async get(url: string, config: any = {}): Promise<any> {
      return request.get(url, { ...config, cancelToken: new CancelToken((c) => (cancel = c)) })
    },
    // async get(data: any = {}): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       method: 'GET',
    //       url: data.url,
    //       params: data.params,
    //       cancelToken: new CancelToken((c) => cancel = c),
    //     }).then((res) => resolve(res))
    //   })
    // },

    async post(url: string, data: Record<string, any> = {}, config: any = {}): Promise<any> {
      return request.post(url, data, {
        ...config,
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
    },
    // async post(data: any = {}): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       method: 'POST',
    //       url: data.url,
    //       data: data.params,
    //       cancelToken: new CancelToken((c) => cancel = c),
    //     }).then((res) => resolve(res))
    //   })
    // }

    async put(url: string, data: Record<string, any> = {}, config: any = {}): Promise<any> {
      return request.put(url, data, {
        ...config,
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
    },

    async delete(url: string, config: any = {}): Promise<any> {
      return request.delete(url, { ...config, cancelToken: new CancelToken((c) => (cancel = c)) })
    },

    async form(url: string, data: Record<string, any> = {}, config: any = {}): Promise<any> {
      return request.post(url, data, {
        ...config,
        headers: {
          ...(config.headers ?? {}),
          'Content-Type': 'multipart/form-data',
        },
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
    },

    async upload(url: string, data: Record<string, any> = {}, config: any = {}): Promise<any> {
      // 封装表单数据对象
      const RequestData = new FormData()

      if (data && JSON.stringify(data) !== '{}') {
        for (var key in Object.keys(data)) {
          if (data[key]) RequestData.append(key, data[key])
        }
      }

      return request.post(url, {
        ...config,
        headers: {
          ...(config.headers ?? {}),
          'Content-Type': 'multipart/form-data',
        },
        data: RequestData,
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
    },
  }
}

export const http = getHttp(defaultRequest)
