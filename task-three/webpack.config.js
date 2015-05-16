var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/js/SpecialList.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel?loose=all', exclude: /node_modules/ },
      { test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ]
  },
  externals: {
    react: 'React'
  },
  output: {
    path: path.resolve('./'), // cf. https://github.com/webpack/webpack-dev-server/issues/88
    filename: 'dist/js/bundled-uglified.js',
    libraryTarget: 'umd',
    library: 'SpecialList'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
