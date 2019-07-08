const merge = require('webpack-merge');

let config = require('./webpack.common.config')

if (process.env.DEMO) {
  const demo = require('./webpack.demo.config')
  config = merge(config, demo)
}

if (process.env.ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config = merge(config, {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  })
}

if (process.env.NODE_ENV === 'production') {
  const production = require('./webpack.production.config')
  config = merge(config, production)
}

module.exports = config;
