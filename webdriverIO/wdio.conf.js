// wdio.conf.js
const { join } = require('node:path');

/** @type {import('@wdio/types').Config} */
exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new','--no-sandbox','--disable-gpu','--window-size=1280,800'] }
  }],
  logLevel: 'info',
  baseUrl: 'http://localhost:5175',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: [
    'spec',
    ['html-nice', {
      outputDir: './wdio-report',
      filename: 'report.html',
      reportTitle: 'WebdriverIO Demo Report'
    }]
  ],
  services: ['chromedriver'],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  outputDir: join(__dirname, 'wdio-logs')
};
