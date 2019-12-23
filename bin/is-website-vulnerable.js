#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const os = require('os')
const debug = require('debug')('is-website-vulnerable')
const argv = require('yargs').argv
const { prompt } = require('enquirer')
const isUrl = require('is-url-superb')
const chalk = require('chalk')
const { Audit, RenderConsole, RenderJson, Utils } = require('../index')

let url = process.argv[2]
debug(`received url argument: ${url}`)

const isWindows = os.type() === 'Windows_NT'
const isJson = !!argv.json
const showProgressBar = !isJson && !isWindows

;(async () => {
  try {
    if (!url) {
      if (isJson) {
        throw new Error('Please provide a URL of a website to scan')
      } else {
        console.error('Woops! You forgot to provide a URL of a website to scan.')

        try {
          const response = await prompt({
            type: 'input',
            name: 'url',
            message: 'Please provide a URL to scan:',
            validate: input => input && input.length > 0 && isUrl(input)
          })
          url = response.url
        } catch (_) {
          throw new Error('URL input prompt failed')
        }
      }
    }

    if (!isUrl(url)) {
      throw new Error('Given argument is an invalid URL')
    }

    url = Utils.parseUrl(url)

    if (isWindows && !isJson) {
      console.log('Please wait, scanning the website (can take up to a minute)...')
    }

    debug(`detecting isWindows: ${isWindows}`)
    debug(`detecting isJson: ${isJson}`)
    debug(`showing progress bar: ${isWindows}`)

    const opts = {
      lighthouseOpts: {},
      chromeOpts: {}
    }

    if (Utils.hasDevice(argv)) {
      opts.lighthouseOpts = Object.assign(opts.lighthouseOpts, {
        emulatedFormFactor: Utils.parseDevice(argv)
      })
    }

    const chromePath = argv.chromePath
    if (chromePath) {
      opts.chromeOpts = Object.assign(opts.chromeOpts, { chromePath })
    }

    const audit = new Audit()

    const results = await audit.scanUrl(url, opts, showProgressBar)
    if (results.lhr.runtimeError) {
      throw new Error(results.lhr.runtimeError.message)
    }

    let renderer
    if (argv.json) {
      renderer = new RenderJson(results, argv.jsLib)
    } else {
      renderer = new RenderConsole(results, argv.jsLib)
    }
    renderer.print()

    process.exit(0)
  } catch (error) {
    console.error(`\n${chalk.red.underline('Error')}: ${error.message}\n`)
    console.error('Usage:\n  is-website-vulnerable https://www.google.com\n\n')
    process.exit(1)
  }
})()
