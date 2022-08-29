import AutoImport from 'unplugin-auto-import/vite'

export const configAutoImport = () => AutoImport({
  // 转换目标
  include:[
    /\.[tj]sx$/, // .ts, .tsx, js, jsx
    /\.vue$/,
    /\.vue\?vue/,
    /\.md$/,
  ],
  // 全局注册
  imports: [
    'vue',
    'vue-router',
    'pinia'
  ],
  // 自动导入所有导出模块
  dirs: ['./src/hooks','./src/components', './src/utils'],
  // 生成相应.d.ts文件的文件路径
  dts: './types/auto-imports.d.ts',
  // Auto import inside Vue template
  vueTemplate: false,
  // Custom resolvers, compatible with `unplugin-vue-components`
  resolvers: [],
  eslintrc: {
    enabled: true, // // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
    filepath: './.eslintrc-auto-import.json',
    globalsPropValue: true
  }
})