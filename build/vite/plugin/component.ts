import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export const configComponents = () => {
  return Components({
    // relative paths to the directory to search for components.
    dirs: [],
    // valid file extensions for components.
    extensions: ['vue'],
    deep: false,
    resolvers: [VantResolver({importStyle: 'less'})],
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: false,

    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  })
}