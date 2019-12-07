import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/user/',
  },
]

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: { title: '用户权限', icon: 'table' },
    children: [
      {
        path: '', 
        name: '用户列表',
        component: () => import('@/views/user/user'),
        meta: { title: '用户列表', icon: 'user' },
        menu: 'user'
      },
      {
        path: 'role', 
        name: '权限管理',
        component: () => import('@/views/user/role'),
        meta: { title: '权限管理', icon: 'password' },
        menu: 'role'
      },
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course',
    children: [{
      path: '',
      name: '课程管理',
      component: () => import('@/views/course/index'),
      meta: { title: '课程管理', icon: 'table' }
    }]
  },
  {
    path: '/place',
    component: Layout,
    redirect: '/place',
    children: [{
      path: '',
      name: '教学点管理',
      component: () => import('@/views/place/index'),
      meta: { title: '教学点管理', icon: 'table' }
    }]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class',
    children: [{
      path: '',
      name: '班级管理',
      component: () => import('@/views/home/index'),
      meta: { title: '班级管理', icon: 'table' }
    }]
  },
  {
    path: '/student ',
    component: Layout,
    redirect: '/student',
    children: [{
      path: '',
      name: '学员管理',
      component: () => import('@/views/student/index'),
      meta: { title: '学员管理', icon: 'table' }
    }]
  },
  {
    path: '/logs ',
    component: Layout,
    redirect: '/logs',
    children: [{
      path: '',
      name: '日志管理',
      component: () => import('@/views/logs/index'),
      meta: { title: '日志管理', icon: 'table' }
    }]
  },
  {
    path: '/region ',
    component: Layout,
    redirect: '/region',
    children: [{
      path: '',
      name: '省市县管理',
      component: () => import('@/views/home/index'),
      meta: { title: '省市县管理', icon: 'table' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  asyncRouterMap
})

