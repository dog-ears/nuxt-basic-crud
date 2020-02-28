console.info('------------------------------')
console.info('functions/index.js start')
console.info('------------------------------')

// dotEnvの読み込み
require('dotenv').config()

console.log('process.env.NODE_ENV is ' + process.env.NODE_ENV)

// firebase-functionsの読み込み
const functions = require('firebase-functions')

// Nuxt およびコンフィグの読み込み
const { Nuxt } = require('nuxt')
const config = require('./nuxt.config.js')

// コンフィグ内、@nuxtjs/eslint-moduleは、firebaseにデプロイするとnotFoundになるため削除
config.buildModules = config.buildModules.filter(
  (n) => n !== '@nuxtjs/eslint-module'
)

// 強制的にproductionモードにする
config.dev = false

// nuxt生成
const nuxt = new Nuxt(config)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.nuxtServer = functions.https.onRequest(async (request, response) => {
  const result = await nuxt.renderRoute(request.url)
  response.send(result.html)
})
