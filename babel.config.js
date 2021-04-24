function getConfig(api) {
  return {
    sourceMaps: true,
    inputSourceMap: true,
    compact: false,
    presets: ['react-app', require.resolve('babel-preset-react-app')],
    plugins: [].filter(Boolean),
  };
}

module.exports = getConfig;
