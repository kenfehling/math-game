import path from 'path'

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)?$/,
        loaders: [
          'ts-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jp?g|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          "url-loader?limit=10000000"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      img: path.join(__dirname, 'img')
    }
  },
  node: { Buffer: false }
};