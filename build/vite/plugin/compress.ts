import compressPlugin from 'vite-plugin-compression'
import type { Plugin } from 'vite'

/**
 * @description: 打包压缩插件
 * @param { 'gzip' | 'brotli' | 'none' } compress 压缩类型
 */

export function configCompressPlugin(compress: 'gzip' | 'brotli' | 'none'): Plugin | Plugin[] {
  const compressList = compress.split(',')
  const plugins: Plugin[] = []
  if(compressList.includes('gzip')) {
    plugins.push(
     compressPlugin({
      ext: '.gz',
     })  
    )
  }
  if(compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
      })
    )
  }
  return plugins
}