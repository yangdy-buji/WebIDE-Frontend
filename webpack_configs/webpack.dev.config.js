const webpack = require('webpack')
const merge = require('webpack-merge')
const str = JSON.stringify
const commonConfig = require('./common.config.js')

const devServer = require('./devServer.config')
const stylesheet = require('./stylesheet.config')

const reactHotLoaderPrependEntries = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8060',
  'webpack/hot/only-dev-server',
]

const config = merge(
  {
    entry: {
      main: reactHotLoaderPrependEntries,
      workspaces: reactHotLoaderPrependEntries,
    }
  },
  commonConfig({ staticDir: '' }),
  { devtool: 'cheap-module-eval-source-map' },
  { plugins: [
      new webpack.DefinePlugin({
        __DEV__: true,
        __RUN_MODE__: str(process.env.RUN_MODE || ''),
        __BACKEND_URL__: str(process.env.RUN_MODE ? process.env.BACKEND_URL : 'http://localhost:8080'),
        __WS_URL__: str(process.env.RUN_MODE ? process.env.WS_URL : ''),
        __PACKAGE_SERVER__: str(process.env.PACKAGE_SERVER),
      }),
    ]
  },
  devServer({ port: 8060 }),
  stylesheet()
)

console.log(config)
module.exports = config