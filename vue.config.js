module.exports = {
  configureWebpack: {
    resolve: {
      alias:{
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'assets': '@/assets',
        'views': '@/views',
        'store': '@/store',
      }
    }
  },
}