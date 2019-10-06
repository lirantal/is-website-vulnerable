#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const { Audit, RenderConsole } = require('../index')

const url = process.argv[2]
const regExp = RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g)

if (!regExp.test(url)) {
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
  .scanUrl(url)
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
