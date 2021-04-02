import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    redirect: '/registration/items'
  },
  {
    path: '/registration/items',
    name: 'registration-items',
    component: () => import(/* webpackChunkName: "registration-items" */ '../views/registration-items.vue')
  },
  {
    path: '/registration/form',
    name: 'registration-form',
    component: () => import(/* webpackChunkName: "registration-form" */ '../views/registration-form.vue')
  },
  {
    path: '/registration/success',
    name: 'registration-success',
    component: () => import(/* webpackChunkName: "registration-success" */ '../views/registration-success.vue'),
    props: route => ({ stripeSessionId: route.query.session_id })
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
