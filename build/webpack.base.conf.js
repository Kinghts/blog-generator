const path = require('path')
const webpack = require('webpack')
const MarkdownPlugin = require('../markdown-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[contentHash:8].css'),
    new MarkdownPlugin({
      source: './markdown',
      output: './article/', // 该路径相对于output.path
      path: './article/' // 前端调用时的路径
    })
  ],
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/, //css的加载，使用ExtractTextPlugin插件可以将CSS文件从html里分离出来
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['vue-style-loader', 'css-loader']
        })
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/, //image的加载
        loader: 'file-loader',
        options: {
          name: '/img/[name].[hash:7].[ext]' // 这里使用绝对路径，解决生成的CSS里url路径不正确的问题
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, //font的加载
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: path.resolve(__dirname, 'utils/markdown-loader'),
            options: {}
          }
        ]
      }
    ]
  }
}
