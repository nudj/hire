const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const EnvkeyWebpackPlugin = require('envkey-webpack-plugin')
const StartServerPlugin = require('start-server-webpack-plugin')

console.log(process.env)

module.exports = {
  entry: ['webpack/hot/poll?1000', './app/server'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /\/usr\/src\/(node_modules\/)?@nudj\/.*\/node_modules\/.*/
      }
    ]
  },
  cache: false,
  plugins: [
    new StartServerPlugin({
      name: 'lol.js'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new EnvkeyWebpackPlugin({
      permitted: [
        'AUTH0_DOMAIN',
        'AUTH0_CLIENT_ID',
        'AUTH0_CLIENT_SECRET',
        'PROTOCOL_DOMAIN',
        'NODE_ENV',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'GOOGLE_AUTH_CALLBACK',
        'INTERCOM_ACCESS_TOKEN',
        'MAILGUN_API_KEY',
        'MAILGUN_DOMAIN'
      ],
      define: { ENVKEY: process.env.ENVKEY }
    })
  ],
  output: {
    filename: 'lol.js'
  }
}
