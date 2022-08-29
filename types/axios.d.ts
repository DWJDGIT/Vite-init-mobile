import 'axios'
declare module 'axios' {
  /**
   * @description: 响应数据
   * @param { any } data 响应数据
   * @param { Number } rt_code 状态码
   * @param { String } rt_msg 状态信息
   */
  export interface CustomResponse<T = any> {
    data: T
    rt_code: Number
    rt_msg: String
  }

  /**
   * @description: 扩展axios的config配置
   * @param { boolean } loading 是否显示loading
   * @param { number } retryCount 重试次数
   * @param { boolean } isNeedToken 是否需要令牌
   * @param { boolean } isNeedShowError 是否显示错误信息
   */
  export interface AxiosRequestConfig {
    loading?: boolean
    retryCount?: number
    isNeedToken?: boolean
    isNeedShowError?:boolean
  }
}