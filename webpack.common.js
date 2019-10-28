const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new ManifestPlugin({
    fileName: '../../data/resources.json', // put the manifest file in hugo's data directory
    publicPath: 'dist/'
  })
];

module.exports = {
  plugins: plugins,

  resolve: {
    alias: {
    
    }
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              limit: 50
            }
          }
        ]
      }
    ]
  },
  
  optimization: {
    splitChunks: {
      cacheGroups: {
        // put all css in commons.css
        // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
        styles: {
          test: /\.(sa|sc|c)ss$/,
          name: 'commons',
          chunks: 'all',
          enforce: true,
          priority: 10
        },
        
        // put shared modules in commons.js
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};