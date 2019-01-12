import Vue from 'vue'
import Router from 'vue-router'
import PersonInfo from '@/views/PersonInfo'
import Home from '@/views/home'
import PlayerCmp from '@/views/PlayerCmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/personInfo',
      name: 'PersonInfo',
      component: PersonInfo
    },
    {
      path: '/playerCmp',
      name: 'PlayerCmp',
      component: PlayerCmp
    }
  ]
})
