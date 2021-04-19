module.exports = {
    configureWebpack: {
      externals: {
        // eslint-disable-next-line quote-props
        'BMap': 'BMap'
      }
    },
    devServer: {
      proxy: {
        '/': {
           target: 'https://www.waxijiang.top:5000',
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
