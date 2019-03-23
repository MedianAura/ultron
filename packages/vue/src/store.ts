import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState} from './types';
import {login} from './stores/login.store';

const packageData = require('../package.json');

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: packageData.version,
    login: {}
  },
  modules: {
    login
  }
};

export default new Vuex.Store<RootState>(store);
