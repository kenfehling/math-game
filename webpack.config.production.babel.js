const webpack = require('webpack')
const base = require('./webpack.config.base.babel.js')

module.exports = Object.assign({}, base, {
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