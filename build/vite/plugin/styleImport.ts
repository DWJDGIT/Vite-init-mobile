import { createStyleImportPlugin } from 'vite-plugin-style-import'
export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
          // 无需额外引入样式的组件
          const ignoreList = [
            'action-bar-button',
            'action-bar-icon',
            'action-bar',
            'action-sheet',
            'address-edit',
            'address-list',
            'area',
            'badge',
            'button',
            'calendar',
            'card',
            'cascader',
            'cell-group',
            'cell',
            'checkbox-group',
            'checkbox',
            'circle',
            'col',
            'collapse-item',
            'collapse',
            'composables',
            'config-provider',
            'contact-card',
            'contact-edit',
            'contact-list',
            'count-down',
            'coupon-cell',
            'coupon-list',
            'coupon',
            'datetime-picker',
            'divider',
            'dropdown-item',
            'dropdown-menu',
            'empty',
            'field',
            'form',
            'grid-item',
            'grid',
            'icon',
            'image',
            'index-anchor',
            'index-bar',
            'lazyload',
            'list',
            'loading',
            'locale',
            'nav-bar',
            'notice-bar',
            'number-keyboard',
            'overlay',
            'pagination',
            'password-input',
            'picker',
            'popover',
            'popup',
            'progress',
            'pull-refresh',
            'radio-group',
            'radio',
            'rate',
            'row',
            'search',
            'share-sheet',
            'sidebar-item',
            'sidebar',
            'skeleton',
            'slider',
            'space',
            'step',
            'stepper',
            'steps',
            'sticky',
            'submit-bar',
            'swipe-cell',
            'swipe-item',
            'swipe',
            'switch',
            'tab',
            'tabbar-item',
            'tabbar',
            'tabs',
            'tag',
            'tree-select',
            'uploader',
          ]
          // 需要额外引入样式的组件
          const enterList: { [x: string]: string } = {
            'toast': 'toast',
            'dialog': 'dialog',
            'notify': 'notify',
            'image-preview': 'image-preview'
          }
            
          return ignoreList.includes(name)
          ? ''
          : Object.hasOwnProperty.call(enterList, name)
          ? `vant/es/${enterList[name]}/style/index`
          : `vant/es/${name}/style/index`
        }
      }
    ]
  })
  return styleImportPlugin
}