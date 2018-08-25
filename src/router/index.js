import Vue from 'vue'
import Router from 'vue-router'
import PersonInfo from '@/views/PersonInfo'
import Index from '@/views/Index'
import PlayerCmp from '@/views/PlayerCmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {keepAlive: true}
    },
    {
      path: '/PersonInfo',
      name: 'PersonInfo',
      component: PersonInfo,
      meta: {keepAlive: false}
    },
    {
      path: '/PlayerCmp',
      name: 'PlayerCmp',
      component: PlayerCmp,
      meta: {keepAlive: true}
    }
  ]
})
