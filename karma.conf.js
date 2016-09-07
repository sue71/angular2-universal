const path = require('path');
const webpackConfig = require('./webpack.config.js');

const WEBPACK_TESTING_CONFIG = webpackConfig.TESTING_CONFIG;

module.exports = config => {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'chai'],

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.ts',
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd',
      },
      captureConsole: true
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }

    port: 9876,

    coverageReporter: {
      dir: 'coverage',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ \-]/)[0];
      },
      reporters: [
        { type: 'json', subdir: '.', file: 'coverage.json' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
        { type: 'text-summary', subdir: '.' },
      ],
    },

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: true,

    concurrency: Infinity
  })
}
