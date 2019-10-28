const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env) {
  const outputPath = path.resolve(__dirname, 'static/dist');
  console.log('outputPath ', outputPath);

  var entries = {};
  glob.sync(path.resolve(__dirname, 'src/js/pages/*.js')).forEach(function(path) {
    entries[path.split('/').slice(-1)[0].replace('.js', '')] = path;
  });
  console.log('entries ', entries);

  return merge(common, {
    mode: 'production',
    entry: entries,
    output: {
      filename: '[name].[hash].js',
      path: outputPath
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new CleanWebpackPlugin(outputPath),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash].css'
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  });
};