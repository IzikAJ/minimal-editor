const webpack = require('webpack');
const path = require('path');
const EnvPlugin = new webpack.EnvironmentPlugin({
  NODE_ENV: 'development',
  DEMO: false,
  ANALYZE: false,
})

const config = {
  entry: {
    'minimal-editor': path.resolve(__dirname, 'lib/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|svg)$/,
        use: 'file-loader',
        include: /vendor/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    EnvPlugin
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
}

module.exports = config;
