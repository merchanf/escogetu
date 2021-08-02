const { resolve } = require('path');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': resolve('./src/app'),
      '@components': resolve('./src/app/components'),
      '@models': resolve('./src/app/models'),
      '@hooks': resolve('./src/app/hooks'),
      '@hocs': resolve('./src/app/hocs'),
      '@utils': resolve('./src/app/utils'),
      '@constants': resolve('./src/app/constants'),
      '@services': resolve('./src/app/services'),
      '@assets': resolve('./src/assets'),
      '@reducers': resolve('./src/app/redux/reducers'),
      '@actions': resolve('./src/app/redux/actions'),
      '@stores': resolve('./src/app/redux/stores'),
    };
    return config;
  },
}