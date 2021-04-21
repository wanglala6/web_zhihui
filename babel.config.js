// 项目发布阶段插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 'transform-remove-console'
    // 展开运算符
    ...prodPlugins
  ]
}
