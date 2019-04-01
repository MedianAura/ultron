import { User } from '@/models/user.model';
import { ILoginState, IRootState } from '@/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: ILoginState = {
  user:
    localStorage.getItem('currentUser') !== null
      ? JSON.parse(unescape(atob(localStorage.getItem('currentUser') || '{}')))
      : null,
  isLogged: localStorage.getItem('currentUser') !== null,
  error: false,
};

// getters
const getters: GetterTree<ILoginState, IRootState> = {};

// actions
const actions: ActionTree<ILoginState, IRootState> = {
  login({ commit }, payload: User): void {
    commit('login', payload);
  },
  logout({ commit }): void {
    commit('logout');
  },
};

// mutations
const mutations: MutationTree<ILoginState> = {
  login(loginState: ILoginState, payload: User): void {
    loginState.user = payload;
    localStorage.setItem('currentUser', btoa(JSON.stringify(loginState.user)));
    loginState.isLogged = true;
  },
  logout(loginState: ILoginState): void {
    loginState.user = undefined;
    loginState.isLogged = false;
    localStorage.removeItem('currentUser');
  },
};

const namespaced: boolean = true;

export const LoginStore: Module<ILoginState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
