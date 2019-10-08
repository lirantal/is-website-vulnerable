/* eslint-disable node/no-extraneous-require */
'use strict'

const debug = require('debug')('is-website-vulnerable')

const nodeVersion = process.versions['node']
const nodeVersionMajor = nodeVersion.split('.')[0]
debug(`detected Node.js version: ${nodeVersionMajor}`)
if (nodeVersionMajor < 10) {
  debug('setting global URL variable')
  global.URL = require('url').URL
}

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
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    })

    const opts = {}
    opts.port = chromeInstance.port

    debug(`invoking lighthouse scan for: ${url}`)
    const scanResult = await lighthouse(url, opts, {
      extends: 'lighthouse:default',
      settings: this.settings
    })

    await chromeInstance.kill()
    return scanResult
  }
}
