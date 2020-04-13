import Vue from 'vue'
import Router from 'vue-router'
import SWITCH3FN from '@/pages/switch3fn'
import SWITCH4FS from '@/pages/switch4fs'
import SWITCH4FN from '@/pages/switch4fn'
import NMG from '@/pages/nmg'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/switch3fn',
      name: 'switch3fn',
      component: SWITCH3FN
    },
    {
      path: '/switch4fs',
      name: 'switch4fs',
      component: SWITCH4FS
    },
    {
      path: '/switch4fn',
      name: 'switch4fn',
      component: SWITCH4FN
    },
    {
      path: '/nmg',
      name: 'nmg',
      component: NMG
    }
  ]
})
