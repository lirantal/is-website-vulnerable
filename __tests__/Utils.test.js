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
})
