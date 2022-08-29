import { createHtmlPlugin } from 'vite-plugin-html'
import { MONITOR_SYSTEM, MONITOR_SYSTEM_SDK } from '../../constant'
/**
 * @description: html插件
 * @param {boolean} isBuild 是否打包
 * @param {string} model 运行环境
 */
export function configHtmlPlugin(isBuild: boolean, model: string) {
  // 插入脚本
  const INJECT_SCRIPT = []
  if(isBuild) {
    // 监控系统脚本
    const INJECT_SCRIPT_MONITOR_SYTEM = `
    <script type="text/javascript" src="">
    `
    // 
    MONITOR_SYSTEM && 
    MONITOR_SYSTEM_SDK[model].appId &&
    INJECT_SCRIPT.push(INJECT_SCRIPT_MONITOR_SYTEM)
  }

  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        injectScript: INJECT_SCRIPT.join('')
      }
    }
  })
}