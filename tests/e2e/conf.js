exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['*spec.js'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--disable-web-security']
      //'args': ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile']
    }
  },
}
