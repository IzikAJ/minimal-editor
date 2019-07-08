const presets = [
  [
    // '@babel/preset-env',
    '@babel/preset-react',
  ],
];

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

const development = {
  'plugins': ['react-hot-loader/babel']
};

module.exports = { presets, plugins, env: { development } };
