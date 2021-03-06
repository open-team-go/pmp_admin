import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // 权限

import {hasPermission} from "./utils/hasPermission";

Vue.prototype.hasPerm = hasPermission

Vue.use(ElementUI, { locale })
// Vue.use(VCharts)

Vue.config.productionTip = (process.env.NODE_ENV != 'production')

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
