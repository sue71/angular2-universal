const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');

// plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.resolve(__dirname, 'dist'));
const commonConfig = {
  metadata: {
    title: 'angular-universal',
    baesUrl: 'http://localhost:8080',
    HOT: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader', exclude: helpers.root('src/index.html') },
      { test: /\.css$/, loader: 'to-string-loader!css-loader' },
      { test: /\.json$/, loader: 'raw-loader' }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
};

const clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: helpers.root('dist/client'),
    publicPath: "/"
  },
  node: {
    global: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: false
  }
};

const serverConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    path: helpers.root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  externals: helpers.checkNodeImport,
  node: {
    global: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: true
  }
};

// Default config
const defaultConfig = {
  context: __dirname,
  resolve: {
    root: helpers.root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
}

const webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]
