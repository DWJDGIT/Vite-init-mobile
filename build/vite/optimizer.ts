/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-04 21:08:33
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-30 15:16:46
 */
/**
 * @name configManualChunk
 * @description chunk 拆包优化
 */
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['vant'],
    output: 'vantdv',
  },
]

// @ts-ignore
export const configManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig')
      return reg.test(id)
    })
    return matchItem ? matchItem.output : null
  }
}
