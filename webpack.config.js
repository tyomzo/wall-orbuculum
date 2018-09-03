const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const commonConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'standard-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  node: {
    __dirname: false
  }
};

module.exports = [
  Object.assign(
    {
      target: 'electron-main',
      entry: { bootstrap: './bootstrap.ts' },
      plugins: [new CopyWebpackPlugin([{
          from: './mainWindow.html'
        },
        {
          from: './styles.css'
        }
      ])]
    },
    commonConfig),
  Object.assign(
    {
      target: 'electron-renderer',
      entry: { index: './index.ts' },
      plugins: [new HtmlWebpackPlugin()]
    },
    commonConfig),
]