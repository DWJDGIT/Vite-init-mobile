import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configAutoImport } from './autoImport'
import { configComponents } from './component'
import { configCompressPlugin } from './compress'
import { configVisualizerConfig } from './visualizer'
import { configImageminPlugin } from './imagemin'
import { configStyleImportPlugin } from './styleImport'
import { configHtmlPlugin } from './html'
import stimulusHMR from 'vite-plugin-stimulus-hmr'
import mkcertPlugin from 'vite-plugin-mkcert'
import compressDist, { CompressOptions } from 'rollup-plugin-compress-dist'
import { ANALYSIS } from '../../constant'

const compressOpts: CompressOptions<'zip'> = {
  type: 'zip',
  archiverName: 'dist.zip',
  sourceName: 'dist',
}

export function createVitePlugins(isBuild: boolean, model: string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue(),
    // 自动按需引入组件
    configComponents(),
    // 自动导入方法，组件
    configAutoImport(),
    // https证书
    mkcertPlugin({
      source: 'coding',
    }),
    stimulusHMR(),
  ]
  vitePlugins.push(configHtmlPlugin(isBuild, model))
  vitePlugins.push(configStyleImportPlugin())
  // 打包时
  if (isBuild) {
    vitePlugins.push(configCompressPlugin('gzip'))
    vitePlugins.push(configImageminPlugin())
    ANALYSIS && vitePlugins.push(configVisualizerConfig())
    //打包压缩
    vitePlugins.push(compressDist(compressOpts))
  }
  return vitePlugins
}
