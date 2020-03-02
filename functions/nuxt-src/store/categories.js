import { firestoreAction } from 'vuexfire'
import dayjs from 'dayjs'
import firebase from '~/plugins/firebase'

const firestore = firebase.firestore()
const moduleName = 'categories'
const collectionName = 'categories'

if (process.env.console_process) {
  console.log(`store/${moduleName} start!`)
}

/* ----------------------------------------
state
---------------------------------------- */

export const state = () => ({
  all: [],
  single: null,
  isLoaded: false
})

/* ----------------------------------------
getters
---------------------------------------- */

export const getters = {
  getAll: (state) => {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - getters - getAll() is called!`)
    }
    return state.all
  },
  getSingle: (state) => {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - getters - getSingle() is called!`)
    }
    return state.single
  },
  isLoaded: (state) => {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - getters - isLoaded() is called!`)
    }
    return state.isLoaded
  }
}

/* ----------------------------------------
mutations
---------------------------------------- */

export const mutations = {
  saveSingle(state, data) {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - mutations - saveSingle`)
    }
    state.single = data
  },
  setIsLoaded(state, data) {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - mutations - setIsLoaded`)
    }
    state.isLoaded = !!data
  }
}

/* ----------------------------------------
actions
---------------------------------------- */

export const actions = {
  // 初期化（一覧）
  initAll: firestoreAction(async (ctx) => {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - actions - initAll - firestoreAction`)
    }
    const myCollection = firestore.collection(collectionName)
    await ctx.bindFirestoreRef('all', myCollection)

    if (process.env.console_process) {
      console.log('-- bindFirestore is end!')
    }
    ctx.commit('setIsLoaded', true)
  }),
  // 初期化（詳細）
  initSingle: firestoreAction(async (ctx, id) => {
    if (process.env.console_process) {
      console.log(
        `store/${moduleName} - actions - initSingle - firestoreAction`
      )
    }
    const myDocument = firestore.collection(collectionName).doc(id)
    await ctx.bindFirestoreRef('single', myDocument)

    if (process.env.console_process) {
      console.log('-- bindFirestore is end!')
    }
    ctx.commit('setIsLoaded', true)
  }),
  // 新規作成
  createSingle: firestoreAction(async (ctx, item) => {
    if (process.env.console_process) {
      console.log(
        `store/${moduleName} - actions - createSingle - firestoreAction`
      )
    }
    await firestore
      .collection(collectionName)
      .doc()
      .set({
        name: item.name,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        deletedAt: ''
      })

    if (process.env.console_process) {
      console.log('-- firestore create success!!')
    }
    ctx.commit('setToastMessage', `${item.name}を作成しました。`, {
      root: true
    })
  }),
  // 修正
  saveSingle: firestoreAction(async (ctx, item) => {
    if (process.env.console_process) {
      console.log(
        `store/${moduleName} - actions - saveSingle - firestoreAction`
      )
    }
    await firestore
      .collection(collectionName)
      .doc(item.id)
      .set({
        name: item.name,
        createdAt: item.createdAt,
        deletedAt: item.deletedAt
      })

    if (process.env.console_process) {
      console.log('-- firestore edit success!!')
    }
    ctx.commit('setToastMessage', `${item.name}を修正しました。`, {
      root: true
    })
  }),
  // 削除
  deleteSingle: firestoreAction(async (ctx, item) => {
    if (process.env.console_process) {
      console.log(`store/${moduleName} - actions - deleteSingle() is called!`)
    }
    await firestore
      .collection(collectionName)
      .doc(item.id)
      .delete()

    if (process.env.console_process) {
      console.log('-- firestore delete success!!')
    }
    ctx.commit('setToastMessage', `${item.name}を削除しました。`, {
      root: true
    })
  })
}
