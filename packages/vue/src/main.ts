import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueWait from 'vue-wait'
import BootstrapVue from 'bootstrap-vue'
import './helper/filters'
// import { updateInterval } from './helper/tools'
import VeeValidate from 'vee-validate'

// updateInterval()

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !store.state.login.isLogged) {
//     return next({ path: 'login' })
//   } else if (to.name === 'login' && store.state.login.isLogged) {
//     return next({ path: '/' })
//   }
//
//   next()
// })

Vue.use(VueWait)
Vue.use(BootstrapVue)
Vue.use(VeeValidate)

import {setupFrontendListener} from 'eiphop';

if (typeof window.require !== 'undefined') {
  // listen to ipc responses
  const electron = window.require('electron')
  setupFrontendListener(electron);
}

const wait = new VueWait()

// @ts-ignore
new Vue({ router, store, wait: wait, render: h => h(App) }).$mount('#app')
