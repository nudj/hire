var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

process.noDeprecation = true

module.exports = {
  entry: {
    'lib/server/assets/js/app': './lib/app/client'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ["env", {
              "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
              }
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&-url'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './ignore.css',
      allChunks: true
    })
  ],
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  },
  stats: {
    colors: true,
    cached: false,
    hash: false,
    timings: false,
    version: false,
    warnings: false
  }
}
