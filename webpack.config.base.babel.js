import path from 'path'

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve('static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)?$/,
        loaders: [
          "ts-loader"
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  node: { Buffer: false }
};