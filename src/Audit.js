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
const Spinner = require('@slimio/async-cli-spinner')
const chalk = require('chalk')

// chrome-launcher Spinner
const spinner1 = new Spinner({
  text: chalk.cyan('Setting up a chrome instance'),
  color: 'red',
  spinner: 'bouncingBar'
})
// lighthouse Spinner
const spinner2 = new Spinner({
  text: chalk.cyan('Auditing...'),
  color: 'red',
  spinner: 'bouncingBar'
})

module.exports = class Audit {
  constructor(lighthoutSettings) {
    this.settings = lighthoutSettings || {
      onlyAudits: ['no-vulnerable-libraries', 'js-libraries']
    }
  }

  async scanUrl(url) {
    // Start chrome-launcher Spinner
    spinner1.start()
    const chromeInstance = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    })

    // Stop chrome-launcher Spinner
    spinner1.succeed(
      `${chalk.green(`Set up completed in ${(spinner1.elapsedTime / 1000).toFixed(2)} seconds!`)}`
    )

    // Start lighthouse Spinner
    spinner2.start()

    const opts = {}
    opts.port = chromeInstance.port

    debug(`invoking lighthouse scan for: ${url}`)
    const scanResult = await lighthouse(url, opts, {
      extends: 'lighthouse:default',
      settings: this.settings
    })

    // Stop lighthouse Spinner
    spinner2.succeed(
      `${chalk.green(`Auditing completed in ${(spinner2.elapsedTime / 1000).toFixed(2)} seconds!`)}`
    )

    await chromeInstance.kill()
    return scanResult
  }
}
