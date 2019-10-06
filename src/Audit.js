/* eslint-disable node/no-extraneous-require */
'use strict'

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

module.exports = class Audit {
  constructor(lighthoutSettings) {
    this.settings = lighthoutSettings || {
      onlyAudits: ['no-vulnerable-libraries', 'js-libraries']
    }
  }

  async scanUrl(url) {
    const chromeInstance = await chromeLauncher.launch({
      chromeFlags: ['--headless']
    })

    const opts = {}
    opts.port = chromeInstance.port

    const scanResult = await lighthouse(url, opts, {
      extends: 'lighthouse:default',
      settings: this.settings
    })

    await chromeInstance.kill()
    return scanResult
  }
}
