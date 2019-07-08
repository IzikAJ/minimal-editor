const presets = [
  '@babel/preset-react',
  '@babel/preset-env',
];

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

const development = {
  'plugins': ['react-hot-loader/babel']
};

module.exports = { presets, plugins, env: { development } };
