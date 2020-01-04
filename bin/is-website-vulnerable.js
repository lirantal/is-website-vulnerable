#!/usr/bin/env node
/* eslint-disable no-process-exit */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
const os = require('os')
const debug = require('debug')('is-website-vulnerable')
const argv = require('yargs').argv
const { Audit, RenderConsole, RenderJson, Utils } = require('../index')
const getUrl = require('./get-url')

const getStatus = () => {
  const isWindows = os.type() === 'Windows_NT'
  const isJson = !!argv.json
  const showProgressBar = !isJson && !isWindows

  return { isWindows, isJson, showProgressBar }
}

const getOptions = () => {
  const lighthouseOpts = Utils.hasDevice(argv)
    ? { emulatedFormFactor: Utils.parseDevice(argv) }
    : {}
  const { chromePath } = argv
  const chromeOpts = chromePath ? { chromePath } : {}

  return { lighthouseOpts, chromeOpts }
}

;(async () => {
  try {
    const { isWindows, isJson, showProgressBar } = getStatus()
    const url = await getUrl(process.argv[2], isJson)
    const opts = getOptions()

    if (isWindows && !isJson) {
      console.log('Please wait, scanning the website (can take up to a minute)...')
    }

    debug(`detecting isWindows: ${isWindows}`)
    debug(`detecting isJson: ${isJson}`)
    debug(`showing progress bar: ${isWindows}`)

    const audit = new Audit()

    const results = await audit.scanUrl(url, opts, showProgressBar)
    if (results.lhr.runtimeError) {
      throw new Error(results.lhr.runtimeError.message)
    }

    const renderer = isJson
      ? new RenderJson(results, argv.jsLib)
      : new RenderConsole(results, argv.jsLib)
    renderer.print()

    process.exit(0)
  } catch (error) {
    console.error(`\nError: ${error.message}\n`)
    console.error('Usage:\n  is-website-vulnerable https://www.google.com\n\n')
    process.exit(1)
  }
})()
