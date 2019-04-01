import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { setupFrontendListener } from 'eiphop';

Vue.config.productionTip = false;

if (typeof window.require !== 'undefined') {
  // listen to ipc responses
  const electron = window.require('electron');
  setupFrontendListener(electron);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
