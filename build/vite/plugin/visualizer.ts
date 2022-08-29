import visualizer from 'rollup-plugin-visualizer'

/** 可视化 */
export function configVisualizerConfig() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  })
}