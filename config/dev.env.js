'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // 這裡設置環境變數  運用地方 : ajax 取得路徑可以透過變數管理
  NODE_ENV: '"development"',
  APIPATH : '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH : '"jiaren-products"'
})
