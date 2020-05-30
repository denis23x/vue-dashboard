import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard'),
      children: [{
        path: ':id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/detail'),
      }]
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "create" */ './views/create')
    }
  ]
});

export default router
