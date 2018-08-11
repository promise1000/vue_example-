import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import createNode from '@/components/devicemanager/createnode'
import login from '@/components/login/Login'
// import welcome from '@/components/welcome/welcome'
import editNode from '@/components/devicemanager/editnode'
import createEquipment from '@/components/devicemanager/createequipment'
import editEquipment from '@/components/devicemanager/editequipment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   component: welcome
    // },
    {
      path: '/devicemanager/createnode',
      name: 'createnode',
      component: createNode,
      children: [{
        path: '/devicemanager/editnode',
        name: 'editNode',
        component: editNode
      }, {
        path: '/devicemanager/createequipment',
        name: 'createEquipment',
        component: createEquipment
      },
      {
        path: '/devicemanager/editequipment',
        name: 'editEquipment',
        component: editEquipment
      }]
    }
  ]
})
