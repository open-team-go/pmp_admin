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
    redirect: '/home/',
    children:[
      {
        path: '', 
        name: '主页',
        component: () => import('@/views/home/index'),
        meta: { title: '主页'},
      } 
    ]
  },
]

export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/',
    name: '管理员管理',
    children: [
      {
        path: '', 
        name: '管理员列表',
        component: () => import('@/views/admin/index'),
        meta: { title: '管理员列表', icon: 'user' },
      }      
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/',
    name: '权限管理',
    children: [
      {
        path: 'role', 
        name: '角色列表',
        component: () => import('@/views/role/index'),
        meta: { title: '角色列表', icon: 'password' },
      },
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course',
    name:'课程管理',
    children: [{
      path: '',
      name: '课程列表',
      component: () => import('@/views/course/index'),
      meta: { title: '课程列表', icon: 'table' }
    }]
  },
  {
    path: '/place',
    component: Layout,
    redirect: '/place',
    name:'教学点管理',
    children: [{
      path: '',
      name: '教学点列表',
      component: () => import('@/views/place/index'),
      meta: { title: '教学点列表', icon: 'table' }
    }]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class',
    name:'班级管理',
    children: [{
      path: '',
      name: '班级列表',
      component: () => import('@/views/home/index'),
      meta: { title: '班级列表', icon: 'table' }
    }]
  },
  {
    path: '/student ',
    component: Layout,
    redirect: '/student',
    name:'学员管理',
    children: [{
      path: '',
      name: '学员列表',
      component: () => import('@/views/student/index'),
      meta: { title: '学员列表', icon: 'table' }
    }]
  },
  {
    path: '/logs ',
    component: Layout,
    redirect: '/logs',
    name:'日志管理',
    children: [{
      path: '',
      name: '日志列表',
      component: () => import('@/views/logs/index'),
      meta: { title: '日志列表', icon: 'table' }
    }]
  },
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  asyncRouterMap
})

