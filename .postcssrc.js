module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 54, // Vant 官方根字体大小是 54
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}