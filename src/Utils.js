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
  trimUtmParams: function(urlToTrim) {
    if (urlToTrim === undefined) return urlToTrim

    // eslint-disable-next-line node/no-deprecated-api
    const parsedUrl = url.parse(urlToTrim)
    const queryParams = parsedUrl.query ? parsedUrl.query.split('&') : []
    const nonUtmQueryParams = []
    queryParams.forEach(queryParam => {
      if (!queryParam.toLowerCase().startsWith('utm_')) {
        nonUtmQueryParams.push(queryParam)
      }
    })
    const auth = parsedUrl.auth ? `${parsedUrl.auth}@` : ''
    const pathname = parsedUrl.pathname !== '/' ? parsedUrl.pathname : ''
    const query = nonUtmQueryParams.length > 0 ? `?${nonUtmQueryParams.join('&')}` : ''
    const hash = parsedUrl.hash ? parsedUrl.hash : ''
    return `${parsedUrl.protocol}//${auth}${parsedUrl.host}${pathname}${query}${hash}`
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
  },
  parseAutentication: function(argv) {
    const extraHeaders = {}
    if (argv.cookie) {
      extraHeaders.Cookie = argv.cookie
    }

    if (argv.token) {
      extraHeaders.Authorization = `Bearer ${argv.token}`
    }

    return extraHeaders
  },
  hasAutentication: function(argv) {
    return ['cookie', 'token'].some(prop => Object.hasOwnProperty.call(argv, prop))
  }
}
