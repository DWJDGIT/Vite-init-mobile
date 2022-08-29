import { type } from 'os'
import { RouterSource } from './common'

/**
 * @description:用户中心配置
 * @param { string } resourceId 系统资源ID
 * @param { string } appId 应用系统ID
 * @param { string } redirectUrl 业务系统地址
 * @param { string } userCenterDomain 用户中心域名
 * @param { String } userCenterRedirectUrl 用户中心重定向地址
 * @param { String } tokenStorageName  令牌存储名称
 * @param { String } tokenTypeStorageName  令牌类型存储名称
 */
export interface UserCenterConfig {
  resourceId: string
  appId: string
  redirectUrl: string
  userCenterDomain: string
  userCenterRedirectUrl: string
  tokenStorageName: string
  tokenTypeStorageName: string
}

/**
 * @description: 全局配置
 * @param { string } title 项目中页面显示的名称
 * @param { string } titleSeparator meta分隔符
 * @param { string } copyright 项目中页面显示的版权信息
 * @param { string } keepAliveMaxNum 缓存路由的最大数量
 * @param { string } routerSource  fontEnd（前端导出路由）和backEnd（后端导出路由）两种方式
 * @param { boolean } routesConstantListMenu  初始化加载路由是否加入菜单栏
 * @param { Array<String> }  routesWhiteList  路由白名单(路径)
 * @param { number } messageDuration message消息框消失时间
 */
export interface SettingConfig {
  title: string
  titleSeparator: string
  titleReverse: boolean
  copyright: string
  keepAliveMaxNum: number
  routerSource: RouterSource
  routesConstantListMenu: boolean
  routesWhiteList: string[]
  messageDuration: number
}

/**
 * @description: 请求配置
 * @param { String }  baseURL 请求地址
 * @param { String }  ContentType 请求数据格式
 * @param { Number }  timeout 请求超时时间
 * @param { String }  tokenName token名称
 * @param { Boolean } loading 是否显示加载中
 * @param { Number }  retryCount 重试次数
 * @param { Boolean } isNeedToken 是否需要token
 * @param { Boolean } isNeedShowError 是否需要显示错误信息
 */
export interface NetConfig {
  baseURL: string
  ContentType: string
  timeout: number
  tokenName: string
  loading: boolean
  retryCount: number
  isNeedToken: boolean
  isNeedShowError: boolean
}


/**
 * @description: 图标配置
 * @param { String } prefix 图标前缀
 * @param { String }  class 图标类名
 */
export interface IconConfig {
  prefix: string
  class: string
}

/** 框架类型 */
type FrameworkType = 'vue' | 'nuxt'
export interface Config {
  type: FrameworkType
  port: number
  host: string
  https?: {}
}