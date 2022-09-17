/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-05 08:04:37
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-30 15:15:10
 */
import type { MonitorConfig } from '../types/build'
// 包依赖分析
export const ANALYSIS = true

// 删除console
export const VITE_DROP_CONSOLE = true

// 是否开启监控系统
export const MONITOR_SYSTEM = false

// 监控系统SDK参数
export const MONITOR_SYSTEM_SDK: { [x: string]: MonitorConfig } = {
  test: {
    url: '',
    appId: '',
  },
  production: {
    url: '',
    appId: '',
  },
}
