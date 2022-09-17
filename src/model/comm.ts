/**
 * 暂不确定类
 */
export type MISSING_TYPE = any

/**
 * 属性/值可扩展对象
 * @param { any } key(string) 数据
 */
export interface ObjectExtends {
  [key: string]: MISSING_TYPE
}

/**
 * @description:  token
 * @param { string } token token
 * @param { string } time 设置时间
 */
export interface Token {
  token: string
  time: string
}

/**
 * @description:  用户信息
 * @param { string } userId id
 * @param { string } userName 名称
 * @param { string } avatar 头像
 * @param { string } token token
 * @param { Array<string> } roleCodes 用户身份
 */
export interface UserInfo {
  userId: string
  userName: string
  avatar?: string
  token: string
  roleCodes: Array<string>
}
