import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { LoginStore } from './stores/login.store';
import { IRootState } from './types';

const packageData = require('../package.json');

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: packageData.version,
    login: {},
  },
  modules: {
    LoginStore,
  },
};

export default new Vuex.Store<IRootState>(store);
