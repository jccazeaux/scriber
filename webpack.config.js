var webpack = require('webpack');
var fs = require('fs');

var file = fs.readFileSync('./package.json', 'utf8');
var VERSION = JSON.parse(file).version;
var BANNER = 'scriber - ' + VERSION +
  ' https://github.com/jccazeaux/scriber\n' +
  ' Copyright (c) 2015 Jean-Christophe Cazeaux.\n' +
  ' Licensed under the MIT license.\n';

module.exports = {
  context: __dirname,
  entry: {
  	'scriber': './src/scriber',
  	'scriber.min': './src/scriber'
  },

  output: {
    path: './dist',
    filename: '[name].js',
    library: 'scriber',
    libraryTarget: 'umd'
  },
  
  plugins: [
   new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new webpack.BannerPlugin(BANNER)
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }
}
