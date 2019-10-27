const { Utils } = require('../index')

describe('Utils', () => {
  test('parseUrl function with no url', async () => {
    const url = undefined
    expect(Utils.parseUrl(url)).toEqual(undefined)
  })

  test('parseUrl function with url given and without protocol', async () => {
    const url = 'google.com'
    expect(Utils.parseUrl(url)).toEqual('http://google.com')
  })

  test('parseUrl function with url given and with protocol', async () => {
    const url = 'https://google.com'
    expect(Utils.parseUrl(url)).toEqual('https://google.com')
  })

  test('trimUtmParams function with no url', async () => {
    const url = undefined
    expect(Utils.trimUtmParams(url)).toEqual(undefined)
  })

  test('trimUtmParams function with url given with no utm query params', async () => {
    const url = 'https://google.com'
    expect(Utils.trimUtmParams(url)).toEqual(url)
  })

  test('trimUtmParams function with url given with utm query params', async () => {
    const url =
      'https://snyk.io/vuln/npm:jquery?lh=3.3.1&utm_source=lighthouse&utm_medium=ref&utm_campaign=audit'
    expect(Utils.trimUtmParams(url)).toEqual('https://snyk.io/vuln/npm:jquery?lh=3.3.1')
  })

  test('trimUtmParams function with url given with utm query params in uppercase', async () => {
    const url =
      'https://snyk.io/vuln/npm:jquery?lh=3.3.1&UTM_SOURCE=lighthouse&utm_medium=ref&UTM_CAMPAIGN=audit'
    expect(Utils.trimUtmParams(url)).toEqual('https://snyk.io/vuln/npm:jquery?lh=3.3.1')
  })

  test('trimUtmParams function with url given with utm query params with custom UTM', async () => {
    const url = 'https://snyk.io/vuln/npm:jquery?lh=3.3.1&utm_something=123'
    expect(Utils.trimUtmParams(url)).toEqual('https://snyk.io/vuln/npm:jquery?lh=3.3.1')
  })

  test('trimUtmParams function with url given with no utm query params but with other query params', async () => {
    const url = 'https://google.com?version=1&minor=5&source=github'
    expect(Utils.trimUtmParams(url)).toEqual(url)
  })
  test('trimUtmParams function with url and auth given with no utm query params but with other query params', async () => {
    const url = 'https://user:pass@google.com?version=1&minor=5&source=github'
    expect(Utils.trimUtmParams(url)).toEqual(url)
  })
  test('trimUtmParams function with hash given with no utm query params but with other query params', async () => {
    const url = 'https://user:pass@google.com?version=1&minor=5&source=github#hash'
    expect(Utils.trimUtmParams(url)).toEqual(url)
  })
})
