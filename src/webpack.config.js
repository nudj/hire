var path = require('path')
var webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

process.noDeprecation = true

console.log('Building for environment:', process.env.NODE_ENV)

let plugins = [
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./vendors-manifest.json')
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV'])
]
if (process.env.DEBUG !== 'true') {
  plugins = plugins.concat([new UglifyJSPlugin()])
}

module.exports = {
  cache: true,
  entry: {
    'app/server/build/app': './app/client'
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
        include: [path.join(__dirname, 'app'), path.join(__dirname, '@nudj')],
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7']
                }
              }
            ]
          ]
        }
      }
    ]
  },
  resolve: {
    mainFields: ['main']
  },
  plugins,
  stats: {
    colors: true,
    cached: false,
    hash: false,
    timings: false,
    version: false,
    warnings: false
  }
}
