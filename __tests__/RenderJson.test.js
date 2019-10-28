const RenderJson = require('../src/RenderJson')

describe('JSON renderer', () => {
  test('Printed JSON should have relevant data points', () => {
    const results = require('./fixtures/multiple-vulnerabilities.json')
    const renderer = new RenderJson(results, '--json')

    const vulnInfo = renderer.format()
    // expect(vulnInfo).toEqual('')
    expect(vulnInfo.match(/"totalVulnerabilities": 14/)).toBeTruthy()
    expect(vulnInfo.match(/"executionTime": "23423 ms"/)).toBeTruthy()
  })

  test('No vulnerability information should render an empty JSON', () => {
    const renderer = new RenderJson({})
    const vulnInfo = renderer.formatVulnerability()
    expect(vulnInfo).toEqual('')
  })

  test('Printed JSON should also support no vulnerabilities existing', () => {
    const results = require('./fixtures/no-vulns.json')
    const renderer = new RenderJson(results)

    const vulnInfo = renderer.format()
    expect(vulnInfo.match(/"vulnerabilities": \[\]/)).toBeTruthy()
    expect(vulnInfo.match(/"totalVulnerabilities": 0/)).toBeTruthy()
  })

  describe('Libraries formatters', () => {
    test('No library information should return json with empty libraries array', () => {
      const results = require('./fixtures/library-empty.json')
      const renderer = new RenderJson(results, true)

      const info = renderer.format()
      expect(info.match(/"libraries": \[\]/)).toBeTruthy()
    })

    test('A library information should not return empty array when information exists', () => {
      const results = require('./fixtures/multiple-libraries.json')
      const renderer = new RenderJson(results, true)

      const libInfo = renderer.formatLibraries()
      expect(libInfo).not.toEqual([])
    })

    test('No library information flag should not return any library information', () => {
      const results = require('./fixtures/multiple-libraries.json')
      const renderer = new RenderJson(results, false)

      const info = renderer.format()
      expect(info.match(/"libraries": \[/)).toBeFalsy()
    })
  })
})
