#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

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

const audit = new Audit()
const showProgressBar = !argv.json
audit
  .scanUrl(url, opts, showProgressBar)
  .then(results => {
    var renderer
    if (argv.json) {
      renderer = new RenderJson(results)
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
