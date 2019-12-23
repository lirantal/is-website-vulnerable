jest.mock('lighthouse')
jest.mock('chrome-launcher', () => {
  return {
    launch() {
      return {
        port: '1234',
        kill() {
          return null
        }
      }
    }
  }
})

const lighthouse = require('lighthouse')
const { Audit } = require('../index')

describe('Audit', () => {
  test('Instantiation of audit with no settings should default to reasonable scan', async () => {
    const audit = new Audit()
    expect(audit.settings).toEqual({
      onlyAudits: ['no-vulnerable-libraries', 'js-libraries']
    })
  })

  test('Instantiation of audit with custom settings should be allowed', async () => {
    const audit = new Audit({
      onlyAudits: ['no-vulnerable-libraries']
    })
    expect(audit.settings).toEqual({
      onlyAudits: ['no-vulnerable-libraries']
    })
  })

  test('a URL scan should result in calling lighthouse with that url', async () => {
    const url = 'https://abc.com'

    const audit = new Audit()
    await audit.scanUrl(url)

    expect(lighthouse.mock.calls[0][0]).toBe(url)
  })

  test('a URL scan with device flag should result in calling lighthouse with that url & flag', async () => {
    const url = 'https://abc.com'
    const opts = { lighthouseOpts: {}, chromeOpts: {} }
    opts.lighthouseOpts.emulatedFormFactor = 'mobile'

    const audit = new Audit()
    await audit.scanUrl(url, opts)

    expect(lighthouse.mock.calls[0][0]).toBe(url)
    expect(lighthouse.mock.calls[1][1]).toHaveProperty('emulatedFormFactor', 'mobile')
  })
})
