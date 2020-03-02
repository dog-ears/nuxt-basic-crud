import { vuexfireMutations } from 'vuexfire'

if (process.env.console_process) {
  console.log(`store/index start!`)
}

/* ----------------------------------------
state
---------------------------------------- */

export const state = () => ({
  toastMessage: ''
})

/* ----------------------------------------
getters
---------------------------------------- */

export const getters = {
  getToastMessage: (state) => {
    if (process.env.console_process) {
      console.log('store/index - getters - getToastMessage() is called!')
    }
    return state.toastMessage
  }
}

/* ----------------------------------------
mutations
---------------------------------------- */

export const mutations = {
  setToastMessage(state, message) {
    if (process.env.console_process) {
      console.log('store/index - mutations - setToastMessage() is called!')
    }
    state.toastMessage = message
  },
  clearToastMessage(state) {
    if (process.env.console_process) {
      console.log('store/index - mutations - clearToastMessage() is called!')
    }
    state.toastMessage = ''
  },
  ...vuexfireMutations
}

/* ----------------------------------------
actions
---------------------------------------- */

export const actions = {
  // 初期化
  clearToastMessage: (ctx) => {
    if (process.env.console_process) {
      console.log('store/index - actions - clearToastMessage() is called!')
    }
    ctx.commit('clearToastMessage')
  }
}
