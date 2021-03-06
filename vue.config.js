module.exports = {
    configureWebpack: {
      externals: {
        BMap: "BMap"
      }
    },
    devServer: {
      proxy: {
        '/': {
          target: 'http://47.106.239.161:5000',
          // 允许跨域
          changeOrgin: true,
          ws: true,
          psthRewrite: {
            '^/': ''
          }
          }

      }
     },
}
