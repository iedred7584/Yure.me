import Vue from 'vue'
import Router from 'vue-router'
import Quake from '@/components/quake.vue'
import History from '@/components/history.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      redirect: '/quake'
    },
    {
      path: '/quake',
      name: 'Quake',
      component: Quake
    },
    {
      path: '/archive/:id',
      name: 'Archive',
      component: Quake
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '*',
      name: 'ToQuake',
      redirect: '/'
    }
  ]
})
