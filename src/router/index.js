import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import createNode from '@/components/devicemanager/createnode'
import login from '@/components/login/Login'
// import welcome from '@/components/welcome/welcome'
import Profile from '@/components/component/Profile'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   component: welcome
    // },
    {
      path: '/createnode',
      name: 'createNode',
      component: createNode
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: Profile
    }
  ]
})
