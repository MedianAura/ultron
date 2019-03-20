import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { LoginState, RootState } from '@/types'
import { User } from '@/models/user.model'

const state: LoginState = {
  user: localStorage.getItem('currentUser') !== null ? JSON.parse(unescape(atob(localStorage.getItem('currentUser') || '{}'))) : null,
  isLogged: localStorage.getItem('currentUser') !== null,
  error: false
}

// getters
const getters: GetterTree<LoginState, RootState> = {}

// actions
const actions: ActionTree<LoginState, RootState> = {
  login (state, payload: User) {
    state.state.user = payload
    localStorage.setItem('currentUser', btoa(JSON.stringify(state.state.user)))
    state.state.isLogged = true
  },
  logout (state) {
    state.state.user = null
    state.state.isLogged = false
    localStorage.removeItem('currentUser')
  }
}

// mutations
const mutations: MutationTree<LoginState> = {}

const namespaced: boolean = true

export const login: Module<LoginState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
