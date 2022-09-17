/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-30 09:26:54
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-30 14:23:03
 */
import qs from 'qs'
import progress from '@/utils/progress'
import axios, { AxiosRequestConfig } from 'axios'
class RequestQueue {
  // 声明一个 Map 用于存储每个请求的标识 和 取消函数
  private static pending = new Map()

  /**
   * @description: 添加请求
   * @param { AxiosRequestConfig } config
   */
  public addPending = (config: AxiosRequestConfig) => {
    const url = [
      config.method,
      config.url,
      qs.stringify(config.params),
      qs.stringify(config.data),
    ].join('&')
    // 开启进度条
    config?.loading && progress.startLoading()
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!RequestQueue.pending.has(url)) {
          RequestQueue.pending.set(url, cancel)
        }
      })
  }
  /**
   * @description: 移除请求
   * @param config
   */
  public removePending = (config: AxiosRequestConfig) => {
    const url = [
      config.method,
      config.url,
      qs.stringify(config.params),
      qs.stringify(config.data),
    ].join('&')
    if (RequestQueue.pending.has(url)) {
      const cancel = RequestQueue.pending.get(url)
      cancel(url)
      RequestQueue.pending.delete(url)
    }
    // 结束进度条
    progress.endLoading()
  }

  public clearPending = () => {
    for (const [url, cancel] of RequestQueue.pending) {
      cancel(url)
    }
    RequestQueue.pending.clear()
  }
}

export default new RequestQueue()
