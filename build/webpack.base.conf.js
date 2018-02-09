const path = require('path')
const webpack = require('webpack')
const MarkdownPlugin = require('../markdown-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    }),
    new CopyWebpackPlugin([{ from: './markdown/img', to: './img' }])
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
          loaders: {
            less: ExtractTextPlugin.extract({ // 参照vue-loader官网的配置
              use: ['css-loader', 'less-loader'],
              fallback: 'vue-style-loader',
              publicPath: '/' // 解决样式里引入的资源的路径问题
            })
          }
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
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({ // 外部引入的样式需要单独配置
          use: ['css-loader', 'less-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/, //image的加载
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:7].[ext]'
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
