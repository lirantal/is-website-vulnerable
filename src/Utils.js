const url = require('url')
// Removing utm_* parameters from URL
// eslint-disable-next-line security/detect-unsafe-regex
const REGEX_UTM_TRIMMER = /(\?)utm[^&]*(?:&utm[^&]*)*&(?=(?!utm[^\s&=]*=)[^\s&=]+=)|\?utm[^&]*(?:&utm[^&]*)*$|&utm[^&]*/gi

module.exports = {
  parseUrl: function(urlToScan) {
    if (urlToScan === undefined) return urlToScan

    // eslint-disable-next-line node/no-deprecated-api
    if (url.parse(urlToScan).protocol === null) {
      urlToScan = 'http://' + urlToScan
    }

    return urlToScan
  },
  trimUtmParams: function(urlToTrim) {
    if (urlToTrim === undefined) return urlToTrim

    return urlToTrim.replace(REGEX_UTM_TRIMMER, '$1')
  }
}
