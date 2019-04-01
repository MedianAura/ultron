import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './pages/login.vue'),
    },
  ],
  linkActiveClass: 'exact-active',
  linkExactActiveClass: 'active',
});
