const path = require('path');

// TODO
const config = {
  output: {
    library: 'MinimalEditor',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
  },
}

module.exports = config
