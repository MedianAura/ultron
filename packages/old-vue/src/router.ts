import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './pages/main.page.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './pages/login.page.vue'),
    },
  ],
  linkActiveClass: 'exact-active',
  linkExactActiveClass: 'active',
});
