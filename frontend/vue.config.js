module.exports = {
    // baseUrl: '/',
    devServer: {
        proxy: 'https://statping.concierge.stage.razorpay.in',
    },
    // assetsDir: 'assets',
    // filenameHashing: false,
    // productionTip: process.env.NODE_ENV !== 'production',
    // devtools: process.env.NODE_ENV !== 'production',
    // performance: process.env.NODE_ENV !== 'production',
    // devServer: {
    //   disableHostCheck: true,
    //   proxyTable: {
    //     '/api': {
    //       logLevel: 'debug',
    //       target: 'http://0.0.0.0:8585',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     },
    //     '/oauth': {
    //       logLevel: 'debug',
    //       target: 'http://0.0.0.0:8585',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/oauth': ''
    //       }
    //     }
    //   }
    // }
};
