import { RootState } from '@/types'
import { BehaviorSubject } from 'rxjs'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { LogsService } from '@/services/logs.service'
import { get, findIndex, filter, orderBy } from 'lodash'
import { cleanLogRecipe } from '@/helper/tools'
import { LogDetail, LogInterface, Logs, LogsState } from '@/typings/logs'

const state: LogsState = {
  logs: new BehaviorSubject<Logs>({})
}

// getters
const getters: GetterTree<LogsState, RootState> = {
  getLogs: function (state: LogsState) {
    return state.logs.asObservable()
  },
  getLogsSection: (state: LogsState) => (section: string) => {
    return get(state.logs.getValue(), section, [])
  },
  getLogsProdVersion: (state: LogsState) => (section: string) => {
    let sectionLog = get(state.logs.getValue(), section, [])

    return filter(sectionLog, (x: LogInterface) => (x.recipe.type === 'approbation' || x.recipe.type === 'production'))
  }
}

// actions
const actions: ActionTree<LogsState, RootState> = {
  loadData ({ commit }) {
    let content: Logs = LogsService.load()
    commit('setLogs', content)
  }
}

// mutations
const mutations: MutationTree<LogsState> = {
  setLogs (state: LogsState, payload: Logs): void {
    state.logs.next(payload)
  },
  addLog (state: LogsState, payload: LogDetail) {
    let value = state.logs.getValue()

    let log = cleanLogRecipe(payload.log)

    if (typeof value[payload.section] !== 'undefined') {
      value[payload.section].unshift(log)
    } else {
      value[payload.section] = [log]
    }
    orderBy(value[payload.section], ['date'], ['desc'])

    state.logs.next(value)
    LogsService.save(state.logs.getValue())
  }
}

const namespaced: boolean = true

export const Logging: Module<LogsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
