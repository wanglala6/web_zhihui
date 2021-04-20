// const webpack = require('webpack')
module.exports = {
    configureWebpack: {
      externals: {
        // eslint-disable-next-line quote-props
        'BMap': 'BMap'
      }
    },
    // chainWebpack: config => {
    //   config.plugin('provide').use(webpack.ProvidePlugin, [{
    //     // other modules
    //     introJs: ['intro.js']
    //   }])
    // },
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
