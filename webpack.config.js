const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'client/dist'),
    // publicPath: './client/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
    }],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    contentBase: path.join(__dirname, './client/public'),
    compress: true,
    port: 3001,
    proxy: {
      '/graphql': 'http://localhost:3000/',
      '/api': 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
};
