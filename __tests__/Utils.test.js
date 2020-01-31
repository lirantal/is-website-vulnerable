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

  test('parseDevice & hasDevice function with no device flag', async () => {
    const argv = {}
    const defaultDevice = ''
    expect(Utils.parseDevice(argv)).toEqual(defaultDevice)
    expect(Utils.hasDevice(argv)).toEqual(false)
  })

  test('parseDevice & hasDevice with desktop flag', async () => {
    const argv = { desktop: true }
    const device = 'desktop'
    expect(Utils.parseDevice(argv)).toEqual(device)
    expect(Utils.hasDevice(argv)).toEqual(true)
  })

  test('parseDevice & hasDevice with mobile flag', async () => {
    const argv = { mobile: true }
    const device = 'mobile'
    expect(Utils.parseDevice(argv)).toEqual(device)
    expect(Utils.hasDevice(argv)).toEqual(true)
  })

  test('parseDevice & hasDevice with none flag', async () => {
    const argv = { none: true }
    const device = 'none'
    expect(Utils.parseDevice(argv)).toEqual(device)
    expect(Utils.hasDevice(argv)).toEqual(true)
  })

  test('hasAutentication & parseAutentication with none flag', async () => {
    const argv = {}
    expect(Utils.parseAutentication(argv)).toEqual({})
    expect(Utils.hasAutentication(argv)).toEqual(false)
  })

  test('hasAutentication & parseAutentication with cookie flag', async () => {
    const argv = { cookie: 'This is the COOKIE content' }
    expect(Utils.parseAutentication(argv)).toEqual({
      Cookie: 'This is the COOKIE content'
    })
    expect(Utils.hasAutentication(argv)).toEqual(true)
  })

  test('hasAutentication & parseAutentication with token flag', async () => {
    const argv = { token: 'This is the TOKEN content' }
    expect(Utils.parseAutentication(argv)).toEqual({
      Authorization: 'Bearer This is the TOKEN content'
    })
    expect(Utils.hasAutentication(argv)).toEqual(true)
  })

  test('hasAutentication & parseAutentication with token and cookie flags', async () => {
    const argv = {
      cookie: 'This is the COOKIE content',
      token: 'This is the TOKEN content'
    }
    expect(Utils.parseAutentication(argv)).toEqual({
      Cookie: 'This is the COOKIE content',
      Authorization: 'Bearer This is the TOKEN content'
    })
    expect(Utils.hasAutentication(argv)).toEqual(true)
  })
})
