import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Layout from '@/layout/index.vue'
// import Empty from '@/layout/Empty.vue'

const systemCenter: Array<RouteRecordRaw> = [
  {
    name: 'SystemCenter',
    path: '/system',
    redirect: '/system/permission',
    component: shallowRef(Layout),
    meta: {
      title: '系统中心',
    },
    children: [
      {
        name: 'Permission',
        path: '/system/permission',
        component: () => import('@/views/system/permission.vue')
      }
    ]
  }
]

export default systemCenter