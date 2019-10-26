const url = require('url')

module.exports = {
  parseUrl: function(urlToScan) {
    if (urlToScan === undefined) return urlToScan

    // eslint-disable-next-line node/no-deprecated-api
    if (url.parse(urlToScan).protocol === null) {
      urlToScan = 'http://' + urlToScan
    }

    return urlToScan
  },
  parseDevice: function(argv) {
    let device = ''
    if (argv.mobile) {
      device = 'mobile'
    } else if (argv.desktop) {
      device = 'desktop'
    } else if (argv.none) {
      device = 'none'
    }
    return device
  },
  hasDevice: function(argv) {
    return argv.mobile || argv.desktop || argv.none || false
  }
}
