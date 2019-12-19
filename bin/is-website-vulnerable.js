#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const os = require('os')
const debug = require('debug')('is-website-vulnerable')
const argv = require('yargs').argv
const inquirer = require('inquirer')
const { Audit, RenderConsole, RenderJson, Utils } = require('../index')

const main = async () => {
  let url = process.argv[2]
  debug(`received url argument: ${url}`)

  url = Utils.parseUrl(url)

  if (!url) {
    console.error('Woops! You forgot to provide a URL of a website to scan.')

    const question = {
      type: 'input',
      name: 'url',
      message: 'Please provide a URL here:',
      validate: input => input && input.length > 0
    }

    const answers = await inquirer.prompt(question)
    url = answers.url
  }

  const isWindows = os.type() === 'Windows_NT'
  const isJson = !!argv.json
  const showProgressBar = !isJson && !isWindows

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

  try {
    const results = await audit.scanUrl(url, opts, showProgressBar)
    var renderer
    if (argv.json) {
      renderer = new RenderJson(results, argv.jsLib)
    } else {
      renderer = new RenderConsole(results, argv.jsLib)
    }
    renderer.print()
    process.exit(0)
  } catch (error) {
    console.error('')
    console.log(error)

    console.error('')
    console.error('Usage:')
    console.error('  is-website-vulnerable https://www.example.com')
    console.error('')

    process.exit(1)
  }
}

main()
