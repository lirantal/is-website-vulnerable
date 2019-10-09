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
const Ora = require('ora')
const chalk = require('chalk')

// chrome-launcher Spinner
const spinner1 = new Ora({
  text: chalk.cyan('Setting up a chrome instance'),
  color: 'red',
  spinner: 'bouncingBar'
})
// lighthouse Spinner
const spinner2 = new Ora({
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
    let time = new Date()
    const chromeInstance = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    })

    // Stop chrome-launcher Spinner
    spinner1.succeed(
      `${chalk.green(`Set up completed in ${((new Date() - time) / 1000).toFixed(2)} seconds!`)}`
    )

    // Start lighthouse Spinner
    spinner2.start()
    time = new Date()
    const opts = {}
    opts.port = chromeInstance.port

    debug(`invoking lighthouse scan for: ${url}`)
    const scanResult = await lighthouse(url, opts, {
      extends: 'lighthouse:default',
      settings: this.settings
    })

    // Stop lighthouse Spinner
    spinner2.succeed(
      `${chalk.green(`Auditing completed in ${((new Date() - time) / 1000).toFixed(2)} seconds!`)}`
    )

    await chromeInstance.kill()
    return scanResult
  }
}
