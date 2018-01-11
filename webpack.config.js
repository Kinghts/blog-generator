const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MarkdownPlugin = require('./markdown-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist/*.*'],
      {
        exclude: ['/article']
      }
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
      chunks: ['index', 'commons']
    }),
    new ExtractTextPlugin('[name].[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    }),
    new MarkdownPlugin({
      source: './markdown',
      output: './article/', // 该路径相对于output.path
      path: './article/' // 前端调用时的路径
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 8080,
    noInfo: false,
    stats: 'minimal'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/, //image的加载
        use: [
          'file-loader'
        ]
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
