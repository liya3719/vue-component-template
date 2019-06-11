const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'postcss-loader'
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'postcss-loader'
          },
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    port: 8091,
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