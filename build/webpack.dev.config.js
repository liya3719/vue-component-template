const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

console.log(webpackBaseConfig);

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    port: 8090,
    compress: true,
    proxy: {
      '/test': {
        // 支持https写法
        target: 'https://localhsot:3000',
        source: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
module.exports = webpackDevConfig;