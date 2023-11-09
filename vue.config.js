const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 4200 
  },
  transpileDependencies: [
    'vuetify'
  ]
})
