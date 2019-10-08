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
})
