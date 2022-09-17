/*
 * @Description  : 请求配置
 * @Version      : 1.0.0
 * @Author       : ydw
 * @Date         : 2022-08-30 08:40:16
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-30 10:01:58
 */
import type { NetConfig } from '#/config'

const netConfig: NetConfig = {
  baseURL: '',
  ContentType: 'application/json; charset=utf-8',
  timeout: 1000 * 60,
  tokenName: 'Authorization',
  loading: true,
  retryCount: 2,
  isNeedToken: true,
  isNeedShowError: false,
}

export default netConfig
