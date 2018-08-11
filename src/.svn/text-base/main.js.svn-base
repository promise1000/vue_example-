// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import ElementUI from 'element-ui'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/header.css'
import '@/assets/css/leftaside.css'
import '@/assets/css/topbar.css'
import VueCookie from 'vue-cookie'
import Conf from '@/config'
import VueI18n from 'vue-i18n'// 实现多语言切换
// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import ElementLocale from 'element-ui/lib/locale'
// import DatePicker from 'element/lib/date-picker'
import messages from './i18n/index'
// import checkLogin from './plugin/checkLogin'
// import checkToken from './plugin/checkToken'
// import checkApiError from './plugin/checkApiError'
// import checkError from './plugin/checkError'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
// import VueI18n from 'vue-i18n'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueI18n)
Vue.config.lang = 'en' // 当前语言
// Vue.locale('zh-cn', zhLocale)
// Vue.locale('en', enLocale)
Vue.use(VueLocalStorage)
// Vue.use(DatePicker)
// Vue.use(checkLogin)
// Vue.use(checkToken)
// Vue.use(checkApiError)
// Vue.use(checkError)
// Vue.config.lang = 'en'
// Vue.locale('zh-cn', zhLocale)
// Vue.locale('en', enLocale)
// Create VueI18n instance with options
function lang () {
  let t = window.localStorage.getItem('language')
  if (t) {
    return t
  } else {
    return 'en'
  }
}

const language = lang() || 'en'
window.lang = lang() || 'en'

const i18n = new VueI18n({
  locale: language, // set locale
  messages // set locale messages
})
// ElementLocale.i18n((key, value) => i18n.t(key, value))

if (Conf.mode === 'production') {
  // Conf.getUrl((SSOUrl, techUrl, DashboardUrl) => {
  //   console.log(SSOUrl)
  //   Conf.SSOUrl = SSOUrl
  console.log('[SSO] ' + Conf.SSOUrl)
  console.log('[API] ' + Conf.APIUrl)
  // })
} else {
  console.log('[API] ' + Conf.APIUrl)
  console.log('[SSO] ' + Conf.SSOUrl)
}

axios.defaults.baseURL = Conf.APIUrl
//  axios.defaults.baseURL += '/api'
// axios.defaults.withCredentials = true
axios.defaults.timeout = 100000

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
  // beforeCreate: function () {
  //   console.group('beforeCreate 创建前状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // created: function () {
  //   console.group('created 创建完毕状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // beforeMount: function () {
  //   console.group('beforeMount 挂载前状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // mounted: function () {
  //   console.group('mounted 挂载结束状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // beforeUpdate: function () {
  //   console.group('beforeUpdate 更新前状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // updated: function () {
  //   console.group('updated 更新完成状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // beforeDestroy: function () {
  //   console.group('beforeDestroy 销毁前状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // },
  // destroyed: function () {
  //   console.group('destroyed 销毁完成状态===============》')
  //   console.log('%c%s', 'color:red', 'el     : ' + (this.$el))
  //   console.log(this.$el)
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data)
  //   console.log('%c%s', 'color:red', 'message: ' + this.message)
  // }
})
router.beforeEach((to, from, next) => {
  if (store.state.logined === true) {
    next()
  } else {
    if (to.path === '/') {
      next()
    } else if (store.state.logined === false && (to.path === '/welcome' || to.path === '/createnode' || to.path === '/UserInfo')) {
      next({ path: '/' })
    } else if (store.state.logined === false && (from.path === '/welcome')) {
      next({ path: '/' })
    }
  }
})
