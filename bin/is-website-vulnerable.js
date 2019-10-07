#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const debug = require('debug')('is-website-vulnerable')
const { Audit, RenderConsole } = require('../index')
const url = require('url')

let urlToScan = process.argv[2]
debug(`received url argument: ${urlToScan}`)

// eslint-disable-next-line node/no-deprecated-api
if (url.parse(urlToScan).protocol === null) {
  urlToScan = 'http://' + urlToScan
}

if (!urlToScan) {
  console.error('')
  console.error('error: please provide a URL of a website to scan')
  console.error('')
  console.error('Usage:')
  console.error('  is-website-vulnerable https://www.google.com')
  console.error('')
  process.exit(1)
}

const audit = new Audit()
audit
  .scanUrl(urlToScan)
  .then(results => {
    const renderer = new RenderConsole(results)
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
