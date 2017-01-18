const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CWD = process.cwd()
const ENV = process.env.NODE_ENV

const entry = {
  development: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(CWD, 'app/index.js'),
  ],
  production: {
    main: path.join(CWD, 'app/index.js'),
    vendor: ['react', 'react-dom'],
  }
}

const output = {
  development: {
    path: path.resolve(CWD, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  production: {
    path: path.resolve(CWD, 'build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
}

const devtool = {
  development: 'inline-source-map'
}

const jsLoaders = {
  development: {
    loader: 'babel-loader',
    options: {
      presets: ['react-hmre']
    }
  },
  production: {
    loader: 'babel-loader',
  }
}

const cssLoaders = {
  development: {
    use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          localIdentName: '[local]--[path]--[hash:base64:5]',
          modules: true,
          importLoaders: 1,
          sourceMap: true,
        }
      }, {
        loader: 'postcss-loader?sourceMap'
    }]
  },
  production: {
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [{
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
          }
        }, {
          loader: 'postcss-loader'
      }]
    })
  }
}

const plugins = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WriteFilePlugin({log: false}),
    new ExtractTextPlugin({filename: '[name].[contenthash].css'}),
    new HtmlPlugin({
      appMountId: 'app',
      template: 'app/index.ejs',
      title: 'Emoji Picker',
      inject: true,
    }),
    new webpack.DefinePlugin({__DEV__: true}),
  ],
  production: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new HtmlPlugin({
      appMountId: 'app',
      template: 'app/index.ejs',
      title: 'Emoji Picker',
      inject: true,
    }),
    new ExtractTextPlugin({filename: '[name].[contenthash].css'}),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}

module.exports = {
  entry: entry[ENV],

  plugins: plugins[ENV],

  output: output[ENV],

  resolve: {
    alias: {
      components: path.resolve(CWD, 'app', 'components'),
      utils:      path.resolve(CWD, 'app', 'utils'),

    },
    mainFields: ['browser', 'module', 'main'],
  },

  module: {
    rules: [
      Object.assign({test: /\.js$/,  exclude: /node_modules/}, jsLoaders[ENV]),
      Object.assign({test: /\.css$/, exclude: /node_modules/}, cssLoaders[ENV]),
      {test: /\.html$/, loader: 'html-loader'}
    ],
  },

  devtool: devtool[ENV],
  target: 'web',
}