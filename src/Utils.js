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
  }
}
