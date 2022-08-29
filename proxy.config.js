const config = {
  type: 'vue',
  name: 'vite-init-mobile',
  port: process.env.VUE_APP_MODE === 'development' ? 3000 : 3000,
  host: '0.0.0.0',
  mountPath: '/',
  dir: 'dist',
  proxy: {
    development: {},
    test: {},
    production: {}
  }
}

module.exports = config