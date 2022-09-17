import axios from 'axios'
import type { AxiosResponse, CustomResponse } from 'axios'
import netConfig from '@/config/net.config'
import progress from '@/utils/progress'
import responseCode from './responseCodeMessage'
import { Dialog } from 'vant'
import requestQueue from './requestQueue'
const http = axios.create({
  baseURL: netConfig.baseURL,
  timeout: netConfig.timeout,
  headers: {
    'Content-Type': netConfig.ContentType,
  },
  withCredentials: true,
})

const httpErrorHandler = (error: {
  response: AxiosResponse<CustomResponse>
}): Promise<CustomResponse> => {
  // 移除请求进度条
  progress.endLoading()
  // 请求相应数据
  const responseData: CustomResponse = {
    data: '',
    rt_code: 500,
    rt_msg: '请勿重复操作！',
  }
  if (!axios.isCancel(error)) {
    const { response } = error
    /**
     * @description: 统一处理错误
     * @description: 后端状态码优先
     * @description: 提示语根据浏览器状态码优先
     */
    responseData.rt_code = response.data?.rt_code || response.status
    responseData.rt_msg =
      responseCode.getMessage(response.status) || response.statusText || response.data?.rt_msg

    // 错误提示
    response.config?.isNeedShowError &&
      Dialog({ message: responseCode.getMessage(response.status) || response.statusText })
    return Promise.reject(responseData)
  } else {
    return Promise.reject({})
  }
}

// 请求拦截器
http.interceptors.request.use((config) => {
  requestQueue.removePending(config)
  requestQueue.addPending(config)
  if (config.isNeedToken) {
    config.headers &&
      Object.assign(config.headers, {
        [netConfig.tokenName]: '',
      })
  }
  return config
}, httpErrorHandler)

http.interceptors.response.use(async (response: AxiosResponse) => {
  requestQueue.removePending(response.config)
  const { data: responseData, config } = response
  if (response?.status === 200 && responseData?.rt_code === 0) {
    return Promise.resolve(responseData)
  } else if (
    !response?.rt_code &&
    (config.responseType === 'arraybuffer' || config.responseType === 'blob')
  ) {
    return Promise.resolve(response)
  } else if (config.isNeedToken && responseData.rt_code === 1009) {
    return Promise.reject(responseData)
  }
}, httpErrorHandler)
export type { CustomResponse }
export default http
