// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');
const puppeteer = require('puppeteer');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-coverage')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // add 'verbose' for more performance oriented / detailed karma logging for individual specs
    reporters: ['progress', 'dots', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromiumHeadlessConfigured'],
    singleRun: true,
    customLaunchers: {
      ChromiumHeadlessConfigured: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      }
    },
    junitReporter: {
      outputDir: path.join(__dirname, '..', 'reports/test-results/'),
      outputFile: 'test-results.xml',
      suite: 'hida-application',
      useBrowserName: false
    },
    coverageReporter: {
      'dir': path.join(__dirname, '..', 'reports'),
      'reports': ['html', 'lcovonly', 'cobertura', 'text-summary'],
      'fixWebpackSourcePaths': true,
      'report-config': {
        'html': {
          subdir: 'test-coverage'
        },
        'cobertura': {
          file: 'test-coverage/coverage.xml'
        },
        'text-summary': {}
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 50,
          branches: 25,
          functions: 35,
          lines: 50
        }
      }
    },
    reportSlowerThan: 1500,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    concurrency: Infinity
  });
};
