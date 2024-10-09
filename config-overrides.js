const { override, useBabelRc } = require('customize-cra');

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc(), (config) => {
    config.resolve = {
        ...config.resolve,
        fallback: {
            ...config.resolve?.fallback,
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            vm: require.resolve('vm-browserify'),
        },
    };
    return config;
});
