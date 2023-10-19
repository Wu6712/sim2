import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 组测组件
const routes = [
  {
    path: '/',
    redirect: '/index', // 访问地址为 '/' 时，跳转到 '/index'
  },
  {
    path: '/index', // 组件地址
    component: () => import('@/views/index'), // 导入组件
    redirect: '/diandan',  // 底部按钮以上部分跳转为点单页面
    children: [
      {
        path: '/diandan',
        component: () => import('@/views/diandan/index'),
      },
      {
        path: '/tongji',
        component: () => import('@/views/tongji/index'),
      },
      {
        path: '/wode',
        component: () => import('@/views/wode/index'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
