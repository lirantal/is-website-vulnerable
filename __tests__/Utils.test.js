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
})
