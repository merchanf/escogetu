const { resolve } = require('path');

exports.webpack = (config, env) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    // app aliases
    '@app': resolve('./src/app'),
    '@components': resolve('./src/app/components'),
    '@models': resolve('./src/app/models'),
    '@hooks': resolve('./src/app/hooks'),
    '@hocs': resolve('./src/app/hocs'),
    '@utils': resolve('./src/app/utils'),
    '@constants': resolve('./src/app/constants'),
    '@services': resolve('./src/app/services'),
    '@assets': resolve('./src/assets'),
  };

  return config;
};
