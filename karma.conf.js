const testWebpackConfig = require('./webpack.test.js');
const helpers = require('./helpers');

module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    exclude: [],

    files: [
      {
        pattern: './src/spec.ts',
        watched: false
      }
    ],

    preprocessors: {
      './src/spec.ts': ['webpack', 'sourcemap']
    },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    webpackServer: { noInfo: true },

    reporters: [ 'mocha', 'coverage' ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    singleRun: true

  });
};