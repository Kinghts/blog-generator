const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false // 移除打包时的警告
  },
  devtool: false,
  optimization: {
    // minimize: true, // 代替UglifyjsPlugin，production模式下默认true
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        cache: true
      })
    ],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    // 代替ExtractTextPlugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css', // 入口文件打包出来的文件名
      chunkFilename: 'css/[name].[chunkhash].css' // 非入口文件打包出来的文件名
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    new CleanWebpackPlugin(
      ['dist/*.*', 'dist/css', 'dist/img', 'dist/js'],
      {
        root: path.resolve(__dirname, '..'),
        exclude: ['/article']
      }
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})
