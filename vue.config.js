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
          // target:'http://192.168.43.28:5000',
         // target:'http://192.168.43.114:5000',
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
