#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const os = require('os')
const debug = require('debug')('is-website-vulnerable')
const argv = require('yargs').argv
const { Audit, RenderConsole, RenderJson, Utils } = require('../index')

let url = process.argv[2]
debug(`received url argument: ${url}`)

url = Utils.parseUrl(url)

if (!url) {
  console.error('')
  console.error('error: please provide a URL of a website to scan')
  console.error('')
  console.error('Usage:')
  console.error('  is-website-vulnerable https://www.google.com')
  console.error('')
  process.exit(1)
}

const opts = {}

if (Utils.hasDevice(argv)) {
  opts.emulatedFormFactor = Utils.parseDevice(argv)
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

const audit = new Audit()

audit
  .scanUrl(url, opts, showProgressBar)
  .then(results => {
    var renderer
    if (argv.json) {
      renderer = new RenderJson(results, argv.jsLib)
    } else {
      renderer = new RenderConsole(results, argv.jsLib)
    }
    renderer.print()
  })
  .catch(error => {
    console.error('')
    console.log(error)

    console.error('')
    console.error('Usage:')
    console.error('  is-website-vulnerable https://www.example.com')
    console.error('')

    process.exit(1)
  })
