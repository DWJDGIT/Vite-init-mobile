/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-04 17:51:19
 * @LastEditors  : ydw
 * @LastEditTime : 2023-01-12 16:16:23
 */
import { VITE_DROP_CONSOLE } from './build/constant'
import { UserConfig, ConfigEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
import { configManualChunk } from './build/vite/optimizer'
import proxyConfig from './proxy.config'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// 环境变量
const VUE_APP_MODE = process.env.VUE_APP_MODE

const apiList = proxyConfig.proxy.development

const proxyList: { [x: string]: any } = {}

for (const key in apiList) {
  proxyList[`/${key}`] = {
    target: apiList[key],
    changeOrigin: true,
    xfwd: true,
    rewrite: (path: string) => path.replace(`/${key}`, ''),
  }
}
/** @type {import('vite').UserConfig} */
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
    base: '/',
    plugins: createVitePlugins(isBuild, mode),
    resolve: {
      alias: {
        '#/': pathResolve('types') + '/',
        '@': pathResolve('src') + '/',
        '@components': pathResolve('src') + '/components/',
        '@assets': pathResolve('src') + '/assets/',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: {
          //   hack: `true; @import (reference) "${pathResolve('src/assets/css/base.less')}";`,
          // },
          // additionalData: `import "${pathResolve('src/assets/css/index.less')}";`,
          javascriptEnabled: true,
        },
      },
    },
    define: {
      'process.env': {
        VUE_APP_MODE: VUE_APP_MODE,
      },
    },
    server: {
      https: true,
      host: true,
      port: 9000,
      proxy: proxyList,
      // force: true,
      hmr: false,
    },
    optimizeDeps: {
      force: true,
    },
    build: {
      minify: 'terser',
      target: 'es2019',
      terserOptions: {
        compress: {
          keep_classnames: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: configManualChunk,
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 20000,
    },
  }
}
