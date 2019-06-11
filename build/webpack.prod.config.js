const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackProdConfig = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
           MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
           MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true,
        extractComments: true,
        uglifyOptions: {
          compress: {
            unused: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          chunks: 'initial',
          priority: 1
        }
      }
    }
  },
  devtool: 'source-map'
});
module.exports = webpackProdConfig;