const webpack = require('webpack')
import path from 'path'
const base = require('./webpack.config.base.babel.js')

module.exports = Object.assign({}, base, {
  output: {
    ...base.output,
    path: path.resolve('static')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})