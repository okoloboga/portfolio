const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'assets',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      css: {
        url: {
          filter: (url) => !url.startsWith('/assets/'), // Не резолвить пути, начинающиеся с /assets/
        },
      },
    },
  },
})
