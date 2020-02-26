const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);
module.exports = {
  entry: {
    app: isProduction ? path.resolve(__dirname, '../src/entry/index.js') : path.resolve(__dirname, '../src/entry/exam.js')
  },
  output: {
    path: isProduction ? path.resolve(__dirname, '../dist/'): '/',
    filename: isProduction ? 'js/[name].js' : '[name].js',
    publicPath: isProduction ? '': '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true
        }
      },
      // 如果需要对图片转成base64,请使用url-loader
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ],
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.css', '.less', '.scss', '.sass']
  }
};