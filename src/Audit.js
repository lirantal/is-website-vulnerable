/* eslint-disable node/no-extraneous-require */
'use strict'

const debug = require('debug')('is-website-vulnerable')

const nodeVersion = process.versions.node
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

module.exports = class Audit {
  constructor(lighthouseSettings) {
    this.settings = lighthouseSettings || {
      onlyAudits: ['no-vulnerable-libraries', 'js-libraries']
    }
  }

  hasVulnerabilities(scanResult) {
    const vulnerableAudit = scanResult.lhr.audits['no-vulnerable-libraries']

    if (
      vulnerableAudit.details &&
      vulnerableAudit.details.items &&
      vulnerableAudit.details.items.length > 0
    ) {
      return true
    }

    return false
  }

  async scanUrl(url, options = { lighthouseOpts: {}, chromeOpts: {} }, progress = false) {
    const optflags = options.lighthouseOpts
    const chromePath = (options.chromeOpts || {}).chromePath
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

    progress && spinner1.start()
    const chromeOpts = Object.assign(
      {
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
      },
      chromePath && { chromePath }
    )
    let time = new Date()
    const chromeInstance = await chromeLauncher.launch(chromeOpts)

    // Stop chrome-launcher Spinner
    progress &&
      spinner1.succeed(
        `${chalk.green(`Set up completed in ${((new Date() - time) / 1000).toFixed(2)} seconds!`)}`
      )

    // Start lighthouse Spinner
    progress && spinner2.start()
    time = new Date()
    const opts = {}
    opts.port = chromeInstance.port

    if (Object.prototype.hasOwnProperty.call(optflags, 'emulatedFormFactor')) {
      // https://github.com/GoogleChrome/lighthouse#cli-options refer --emulated-form-factor
      opts.emulatedFormFactor = optflags.emulatedFormFactor
      debug(`setting up lighthouse device flag: ${opts.emulatedFormFactor}`)
    } else {
      debug('lighthouse default device flag: mobile')
    }

    debug(`invoking lighthouse scan for: ${url}`)
    const scanResult = await lighthouse(url, opts, {
      extends: 'lighthouse:default',
      settings: this.settings
    })

    // Stop lighthouse Spinner
    progress &&
      spinner2.succeed(
        `${chalk.green(
          `Auditing completed in ${((new Date() - time) / 1000).toFixed(2)} seconds!`
        )}`
      )

    await chromeInstance.kill()
    return scanResult
  }
}
