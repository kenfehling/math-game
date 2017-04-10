const webpack = require('webpack')
import path from 'path'
const base = require('./webpack.config.base.babel.js')

module.exports = Object.assign({}, base, {
  output: {
    ...base.output,
    path: path.resolve('build/static')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        screw_ie8: true
      },
      mangle: true
    })
  ]
})