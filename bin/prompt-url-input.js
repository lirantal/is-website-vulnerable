'use strict'
const debug = require('debug')('is-website-vulnerable')
const { prompt } = require('enquirer')
const isUrl = require('is-url-superb')
const { Utils } = require('../index')

function validate(url) {
  if (!isUrl(url)) {
    throw new Error('Given argument is an invalid URL')
  }

  return Utils.parseUrl(url)
}

async function promptUrlInput(url, isJson) {
  debug(`received url argument: ${url}`)
  if (url) {
    return validate(url)
  }

  if (isJson) {
    throw new Error('Please provide a URL of a website to scan')
  }

  console.error('Woops! You forgot to provide a URL of a website to scan.')

  try {
    const response = await prompt({
      type: 'input',
      name: 'url',
      message: 'Please provide a URL to scan:',
      validate(input) {
        return input && input.length > 0 && isUrl(input)
      }
    })

    return validate(response.url)
  } catch (_) {
    throw new Error('URL input prompt failed')
  }
}

module.exports = promptUrlInput
