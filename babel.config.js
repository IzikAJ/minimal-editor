const presets = [
  '@babel/preset-react',
  '@babel/preset-env',
];

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-optional-chaining',
];

const development = {
  'plugins': ['react-hot-loader/babel']
};

module.exports = { presets, plugins, env: { development } };
