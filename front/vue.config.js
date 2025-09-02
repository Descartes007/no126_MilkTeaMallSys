/*
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9192, // 端口
  },
})
