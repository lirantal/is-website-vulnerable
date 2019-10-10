const { RenderConsole } = require('../index')
const chalk = require('chalk')
describe('RenderConsole', () => {
  describe('Severity formatters and charts', () => {
    test('severity color formatting should return expected hex color', () => {
      const renderer = new RenderConsole({})

      const severityColorHex = renderer.formatSeverityColor('Medium')
      expect(severityColorHex).toEqual('#df8620')
    })

    test('severity color formatting should return low by default when unexpected color provided', () => {
      const renderer = new RenderConsole({})
      const severityColorHex = renderer.formatSeverityColor('asasdas')
      expect(severityColorHex).toEqual('#595775')
    })

    test('severity chart formatter should return correctly for low severity', () => {
      const renderer = new RenderConsole({})
      const severity = 'Low'
      const severityColorHex = renderer.formatSeverityChart(severity)
      expect(severityColorHex).toEqual(`${chalk.hex('#595775').bold('■')}■■`)
    })

    test('severity chart formatter should return correctly for high severity', () => {
      const renderer = new RenderConsole({})
      const severity = 'High'
      const severityColorHex = renderer.formatSeverityChart(severity)
      expect(severityColorHex).toEqual(`■■${chalk.hex('##b31a6b').bold('■')}`)
    })
  })

  describe('Libraries formatters', () => {
    test('No library information should render an empty string', () => {
      const renderer = new RenderConsole({}, true)
      const libraryInfo = renderer.formatLibraries()
      expect(libraryInfo).toEqual('')
    })

    test('A library information should not return an empty layout', () => {
      const results = require('./fixtures/multiple-libraries.json')
      const renderer = new RenderConsole(results, true)

      const libInfo = renderer.formatLibraries()
      expect(libInfo).not.toBe('')
    })

    test(' Library flag should also support no library existing', () => {
      const results = require('./fixtures/library-empty.json')
      const renderer = new RenderConsole(results, true)

      const libInfo = renderer.format()
      expect(libInfo.match(/No JavaScript libraries detected/)).toBeTruthy()
    })
  })

  describe('Vulnerability formatters', () => {
    test('No vulnerability information should render an empty string', () => {
      const renderer = new RenderConsole({})
      const vulnInfo = renderer.formatVulnerability()
      expect(vulnInfo).toEqual('')
    })

    test('A vulnerability information should not return an empty layout', () => {
      const results = require('./fixtures/one-medium-vulnerability.json')
      const renderer = new RenderConsole({})

      const vulns = results.lhr.audits['no-vulnerable-libraries'].details.items

      const vulnInfo = renderer.formatVulnerability(vulns[0])
      expect(vulnInfo).not.toBe('')
    })

    test('A vulnerability information should render required items in layout', () => {
      const results = require('./fixtures/one-medium-vulnerability.json')
      const renderer = new RenderConsole({})

      const vulns = results.lhr.audits['no-vulnerable-libraries'].details.items

      const vulnInfo = renderer.formatVulnerability(vulns[0])
      expect(vulnInfo.match('jQuery@1.11.2')[0]).toEqual('jQuery@1.11.2')
      expect(vulnInfo.match(/2 .*vulnerabilities/)[0]).toBeTruthy()
      expect(vulnInfo.match('https://snyk.io/vuln/npm:jquery')[0]).toEqual(
        'https://snyk.io/vuln/npm:jquery'
      )
    })
  })
  describe('Vulnerability renderer', () => {
    test('printed output should have relevant data points', () => {
      const results = require('./fixtures/multiple-vulnerabilities.json')
      const renderer = new RenderConsole(results)

      const vulnInfo = renderer.format()
      // expect(vulnInfo).toEqual('')
      expect(vulnInfo.match(/14.* Total vulnerabilities/)).toBeTruthy()
      expect(vulnInfo.match(/23423.* execution time/)).toBeTruthy()
    })

    test('printed output should also support no vulnerabilities existing', () => {
      const results = require('./fixtures/no-vulns.json')
      const renderer = new RenderConsole(results)

      const vulnInfo = renderer.format()
      expect(
        vulnInfo.match(
          /No JavaScript libraries detected with publicly known security vulnerabilities/
        )
      ).toBeTruthy()
      expect(vulnInfo.match(/0.* Total vulnerabilities/)).toBeTruthy()
    })
  })
})
