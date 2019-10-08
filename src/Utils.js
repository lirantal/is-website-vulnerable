const url = require('url')

module.exports = {
  parseUrl: function(urlToScan) {
    if (urlToScan === undefined) return urlToScan

    // eslint-disable-next-line node/no-deprecated-api
    if (url.parse(urlToScan).protocol === null) {
      urlToScan = 'http://' + urlToScan
    }

    return urlToScan
  }
}
