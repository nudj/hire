var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

process.noDeprecation = true

module.exports = {
  target: 'node',
  entry: {
    'lib/server/build': './lib/app/server'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&sourceMap&-url'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './lib/server/assets/css/app.css',
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
