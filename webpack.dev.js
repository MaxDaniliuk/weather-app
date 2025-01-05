const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 5001,
    open: true,
    hot: true,
    compress: true,
  },
});

// configure babel
// config eslint and prettier