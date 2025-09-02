jest.mock('lighthouse')

const mockKill = jest.fn()
jest.mock('chrome-launcher', () => {
  return {
    launch() {
      return {
        port: '1234',
        kill: mockKill
      }
    }
  }
})

const lighthouse = require('lighthouse')
const { Audit } = require('../index')

describe('Audit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockKill.mockResolvedValue(null)
    lighthouse.mockResolvedValue({
      lhr: {
        audits: {}
      }
    })
  })

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
    // The device option is passed as the second parameter to lighthouse
    expect(lighthouse.mock.calls[0][1]).toHaveProperty('emulatedFormFactor', 'mobile')
  })

  test('should handle Chrome kill errors gracefully', async () => {
    const url = 'https://abc.com'

    // Mock chrome kill to throw an error (like on Windows 11)
    mockKill.mockRejectedValueOnce(new Error('Chrome could not be killed Command failed: taskkill /pid 15132 /T /F'))

    const audit = new Audit()

    // This should not throw an error even when chrome kill fails
    await expect(audit.scanUrl(url)).resolves.toBeDefined()

    // Verify that kill was attempted
    expect(mockKill).toHaveBeenCalled()
  })
})
