<template>
  <div class="home-page">
    <header class="main-header">
      <div class="header-content">
        <div class="logo">
          <img src="@/assets/vue.svg" alt="" />
          <span>测试组件</span>
        </div>
        <div class="header-item">
          <!-- <div class="project-content">5</div>
          <div class="other-content">6</div> -->
        </div>
      </div>
    </header>
    <main class="main-content">
      <nav class="page-nav">
        <div class="operate-menu">
          <a-input
            v-model:value.trim="searchVal"
            allow-clear
            class="search-input"
            @change="() => getItem()"
          >
            <template #prefix><search-outlined /> </template>
          </a-input>
          <div class="menu-content">
            <a-menu v-model:selectedKeys="activeTabs" v-model:open-keys="openKeys" mode="inline">
              <template v-for="item in saveList">
                <a-menu-item
                  v-if="!item.children"
                  :key="item.key"
                  :title="item.title"
                  @click="switchTabs(item)"
                >
                  <template #icon>
                    <schedule-outlined />
                  </template>
                  <span class="tabs-title">{{ item.title }}</span>
                </a-menu-item>
                <a-sub-menu v-else :key="item.title">
                  <template #icon>
                    <BookOutlined />
                  </template>
                  <template #title>{{ item.title }}</template>
                  <template v-for="cItem of item.children">
                    <a-menu-item
                      v-if="!cItem.children"
                      :key="cItem.key"
                      :title="cItem.title"
                      @click.stop="switchTabs(cItem)"
                    >
                      <span>{{ cItem.title }}</span>
                    </a-menu-item>
                    <a-sub-menu v-else :key="cItem.title">
                      <template #title>{{ cItem.title }}</template>
                      <a-menu-item
                        v-for="tItem in cItem.children"
                        :key="tItem.key"
                        :title="tItem.title"
                        @click.stop="switchTabs(tItem)"
                      >
                        <span>{{ tItem.title }}</span>
                      </a-menu-item>
                    </a-sub-menu>
                  </template>
                </a-sub-menu>
              </template>
            </a-menu>
          </div>
        </div>
      </nav>
      <section class="com-content">
        <div class="operate-content">
          <div class="current-page">
            <div class="page-title">{{ activeTitle }}</div>
            <div class="page-content" :style="{ height: pageHeight + 'px' }">
              <template v-if="activeComponent.tabComp">
                <keep-alive>
                  <component :is="activeComponent.tabComp" />
                </keep-alive>
              </template>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  Ref,
  reactive,
  onMounted,
  defineAsyncComponent,
  markRaw,
  shallowRef,
  KeepAlive,
} from 'vue'
import type { Component } from 'vue'
import { BookOutlined, ScheduleOutlined, SearchOutlined } from '@ant-design/icons-vue'
import * as lodash from 'lodash-es'
// 左侧menu数据类型
interface MenuType {
  title: string
  key: string
  icon?: string
  component?: Component | null
  children?: Array<MenuType>
  isLeaf?: boolean //是否有子项
}
interface FileType {
  [x: string]: Component | null
}
// 当前激活的tabs的key
const activeTabs = ref<string[]>(['upgradeLog'])
// 当前激活的页面title
const activeTitle = ref('更新日志')
// const eager = import.meta.globEager('./component/*.vue')
const eager: Component = import.meta.glob('./component/*.vue')
// 目录查询字段
const searchVal = ref<string>('')
// 页面初始高度
const pageHeight = ref<number>(500)
// 需要打开的菜单
const openKeys = ref<string[]>(['', '全局项的说明'])
// 左侧面板数据
const menu: Ref<MenuType[]> = ref([
  {
    title: '更新日志',
    key: 'upgradeLog',
    icon: '',
    component: null,
  },
  {
    title: '组件列表',
    icon: '',
    key: 'component',
    isLeaf: true,
    children: [
      {
        title: '上传(upload)',
        component: null,
        key: 'upload',
      },
    ],
  },
])
// 侧边栏数据
const saveList = shallowRef(menu.value)
/**
 * @description: 获取url参数
 * @param { string } variable
 */
// const getQueryVariable = (variable: string) => {
//   let query = window.location.search.substring(1)
//   let vars = query.split('&')
//   for (let i = 0; i < vars.length; i++) {
//     let pair = vars[i].split('=')
//     if (pair[0] == variable) {
//       return decodeURIComponent(pair[1])
//     }
//   }
//   return false
// }
//当前激活的组件
const activeComponent = reactive<FileType>({
  tabComp: null,
})
// 组件装载(globEager)
// Object.keys(eager).forEach((c: string) => {
//   const url = eager[c].default.__file
//   menu.value.forEach((item: MenuType) => {
//     if (!item.children) {
//       if (url.includes(item.key)) {
//         item.component = markRaw(eager[c].default)
//         console.log(item.component)
//       }
//     } else {
//       item.children.forEach((cItem: MenuType) => {
//         if (item.children && url.includes(cItem.key)) {
//           cItem.component = markRaw(eager[c].default)
//         }
//       })
//     }
//   })
// })
// (glob)
Object.keys(eager).forEach((c: string) => {
  // console.log(c)
  menu.value.forEach((item: MenuType) => {
    if (!item.children) {
      if (c.includes(item.key)) {
        item.component = markRaw(defineAsyncComponent({ loader: eager[c] }))
      }
    } else {
      // 第一层：帮助手册
      item.children.forEach((cItem: MenuType, index: number) => {
        // 第二层已经结束，单独模块
        if (item.children && c.includes(cItem.key)) {
          cItem.component = markRaw(defineAsyncComponent({ loader: eager[c] }))
        }
        // 第三层：还有子项
        if (item.children && item.children.length && item.children[index].children) {
          item.children[index].children!.forEach((tItem: MenuType) => {
            if (c.includes(tItem.key)) {
              tItem.component = markRaw(defineAsyncComponent({ loader: eager[c] }))
            }
          })
        }
      })
    }
  })
})
//切换tabs
const switchTabs = (item: MenuType) => {
  console.log(item, 'item')
  // 正常切换
  activeTabs.value = [item.key]
  activeTitle.value = item.title
  if (item.component) {
    activeComponent.tabComp = shallowRef(item.component)
  } else {
    activeComponent.tabComp = null
  }
  // 被包装成了响应式的对象，会造成不必要的性能开销，使用shallowRef解决
  activeComponent.tabComp = shallowRef(activeComponent.tabComp)
}

// 查询目录项
const getItem = () => {
  if (!searchVal.value.trim()) {
    saveList.value = Object.assign([], menu.value)
    activeTabs.value = [saveList.value[0].key]
    activeTitle.value = saveList.value[0].title
    activeComponent.tabComp = saveList.value[0].component || null
    // openKeys.value = [t('common.helpManual'), '全局项的说明']
    return
  }
  // 模糊查询目录
  let searchList = [] as MenuType[]
  saveList.value = lodash.cloneDeep(menu.value)
  console.log(saveList.value)
  searchList = saveList.value.filter((item) => {
    console.log(item.title.includes(searchVal.value))
    if (item.title.includes(searchVal.value) && !item.isLeaf) {
      return true
    } else {
      if (item?.children && item.children?.length) {
        // 叶子项的处理
        item.children = item.children!.filter((sItem) => {
          // 叶子项title包含搜索内容时，返回，否则就过滤
          if (sItem.children && sItem.children.length) {
            sItem.children = sItem.children!.filter((cItem) => {
              return cItem.title.includes(searchVal.value)
            })
            //查询时打开菜单
            if (!openKeys.value.includes(sItem.title)) {
              openKeys.value.push(sItem.title)
            }
            return sItem.children && (sItem.children as MenuType[]).length
          } else {
            // 没有子项
            if (sItem.title.includes(searchVal.value)) {
              if (!openKeys.value.includes(sItem.title)) {
                openKeys.value.push(sItem.title)
              }
              return true
            }
          }
        })
        return item.children && (item.children as MenuType[]).length
      }
    }
  })
  saveList.value = Object.assign([], searchList)
}

//设置页面高度
// const setPageHeight = () => {
//   // title高度
//   const contentTitleHeight = (document.getElementsByClassName('page-title')[0] as HTMLElement)
//     .scrollHeight
//   // 容器高度
//   const contentHeight = (document.getElementsByClassName('operate-content')[0] as HTMLElement)
//     .scrollHeight
//   const Height = contentHeight - contentTitleHeight
//   pageHeight.value = Height
// }
onMounted(() => {
  // setPageHeight()
  activeComponent.tabComp = menu.value[0].component || null
})
</script>

<style lang="less" scoped>
.home-page {
  height: 100vh;
}

.main-header {
  border: 1px solid #eee;
  box-sizing: border-box;
}

.main-content {
  display: flex;
  .page-nav {
    width: 18rem;
    box-sizing: border-box;
  }
  .com-content {
    flex: auto;
  }
}

.operate-menu {
  border-right: 1px solid #eee;
}
.header-content {
  display: flex;
  background-color: #fff;
  .logo {
    display: flex;
    flex-shrink: 0;
    width: 18rem;
    border-right: 1px solid #eee;
  }
  .header-item {
    display: flex;
    justify-content: space-between;
    flex: auto;
    flex-wrap: nowrap;
  }
}
</style>
<style lang="less" scoped>
.header-content {
  .logo {
    line-height: 3.2rem;
    img {
      padding: 0 0.5rem;
    }
    span {
      // margin: 0;
      vertical-align: middle;
    }
  }
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  width: 100%;
  margin: 0 auto;
  list-style: none;
}

.operate-menu,
.operate-content {
  background: #fff;
}
.operate-menu {
  height: 100%;
  min-width: 18rem;
  max-width: 18rem;
  padding: 1rem;
  color: #999;
  .menu-content {
    margin-top: 0.5rem;
    max-height: 94%;
    overflow-y: auto;
  }
  // .menu-tab {
  //   padding: 0 1rem;
  //   p {
  //     margin-bottom: 0.5rem;
  //     line-height: 2;
  //     &:hover {
  //       // color: @primary-color;
  //       cursor: pointer;
  //     }
  //   }
  //   &-active {
  //     // color: @primary-color;
  //     background-color: #f0f0f0;
  //   }
  //   .tabs-title {
  //     margin-left: 1rem;
  //   }
  // }
  .tab-sub {
    overflow-y: auto;
    .sub-item {
      padding: 0 0 0 2.6rem;
      p {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          max-width: 15.6rem;
          display: block;
        }
        .sub-item-icon {
          flex-shrink: 0;
          margin-right: 0.5rem;
        }
      }
      .next-tab-item {
        margin-left: 1.2rem;
        .next-item-content {
          cursor: pointer;
          margin-bottom: 1rem;
          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
}
.current-page {
  padding: 1rem;
  padding-left: 5rem;
  .page-title {
    font-size: 1.6rem;
    font-weight: 600;
    box-sizing: border-box;
    // border-bottom: 1px solid #001529;
  }
  .page-content {
    padding: 1rem;
    overflow-y: auto;
    .empty-page {
      margin: 0 auto;
      transform: translateY(60%);
      width: 100%;
    }
  }
}
</style>
