import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/components/Layout/index.vue'
import Login from '@/pages/Login/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: 'login',
    children: [
      {
        path: 'login',
        component: Login,
        meta: {
          title: '登录',
        },
      },
      {
        path: 'register',
        component: () => import('@/pages/Register/index.vue'),
        meta: {
          title: '注册',
        },
      },
      {
        path: 'alarm',
        name: 'alarm-parent',
        // redirect: 'alarm-list',
        // component: () => import('@/pages/Register/index.vue'),
        children: [
          {
            path: '',
            // path: 'list',
            // name: 'alarm-list',
            component: () => import('@/pages/AlarmList/index.vue'),
            meta: {
              title: '预警列表',
            },
          },
          {
            path: 'create',
            component: () => import('@/pages/AlarmCreate/index.vue'),
            meta: {
              title: '创建预警',
            },
          },
          {
            path: ':id(\\d+)',
            name: 'alarm-item-parent',
            component: () => import('@/pages/AlarmItem/index.vue'),
            // redirect: 'alarmItemInfo',
            children: [
              {
                // path: 'info',
                path: '',
                // name: 'alarmItemInfo',
                component: () => import('@/pages/AlarmItemInfo/index.vue'),
                meta: {
                  title: '预警详情',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes
