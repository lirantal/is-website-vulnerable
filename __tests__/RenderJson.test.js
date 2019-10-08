const RenderJson = require('../src/RenderJson')

describe('Vulnerability JSON renderer', () => {
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
    expect(
      vulnInfo.match(
        /No JavaScript libraries detected with publicly known security vulnerabilities/
      )
    ).toBeTruthy()
    expect(vulnInfo.match(/"totalVulnerabilities": 0/)).toBeTruthy()
  })
})
