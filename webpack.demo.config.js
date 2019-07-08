const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devServer = {
  contentBase: path.join(__dirname, 'dist'),
  // compress: true,
  port: 9000,

  bonjour: true,
  disableHostCheck: true,
  hot: true,
  overlay: {
    warnings: true,
    errors: true,
  },
}
const alias = { 'react-dom': '@hot-loader/react-dom' }
const optimization = {
  runtimeChunk: 'single',
    splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
            chunks: 'all'
      }
    }
  }
}

config = {
  entry: path.resolve(__dirname, 'demo/index.js'),
  devServer,
  optimization,
  resolve: {
    alias,
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      title: 'Simple Editor',
    }),
  ],
}

module.exports = config
