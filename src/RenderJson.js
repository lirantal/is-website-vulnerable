/* eslint-disable security/detect-object-injection */
/* eslint-disable indent */
'use strict'

module.exports = class RenderJson {
  constructor(scanResults, showLibs) {
    this.data = scanResults
    this.showLibs = showLibs
    this.noWarnings =
      'No JavaScript libraries detected with publicly known security vulnerabilities'
  }

  print() {
    const output = this.format()
    console.log(output)
  }

  format() {
    const vulnerabilitiesResults = this.data.lhr.audits['no-vulnerable-libraries']
    let vulnerabilitiesCount = 0
    var result = []
    if (
      vulnerabilitiesResults.details &&
      vulnerabilitiesResults.details.items &&
      vulnerabilitiesResults.details.items.length > 0
    ) {
      vulnerabilitiesResults.details.items.forEach(vulnItem => {
        vulnerabilitiesCount += vulnItem.vulnCount
        const vulnInfo = this.formatVulnerability(vulnItem)
        result.push(vulnInfo)
      })
    } else {
      result = this.noWarnings
    }

    const json = {
      website: this.data.lhr.finalUrl,
      executionTime: this.data.lhr.timing.total + ' ms',
      totalVulnerabilities: vulnerabilitiesCount,
      result
    }

    if (this.showLibs) {
      json.libraries = this.formatLibraries()
    }

    return JSON.stringify(json, null, 2)
  }

  formatVulnerability(vulnItem) {
    if (!vulnItem || !vulnItem.detectedLib || !vulnItem.vulnCount || !vulnItem.highestSeverity) {
      return ''
    }

    var output = {
      library: vulnItem.detectedLib.text,
      severity: vulnItem.highestSeverity,
      vulnerabilitiesCount: vulnItem.vulnCount,
      url: vulnItem.detectedLib.url
    }
    return output
  }

  formatLibraries() {
    if (!this.data.lhr) return []

    const jsLibrariesResult = this.data.lhr.audits['js-libraries']
    if (
      jsLibrariesResult &&
      jsLibrariesResult.details &&
      jsLibrariesResult.details.items &&
      jsLibrariesResult.details.items.length > 0
    ) {
      return jsLibrariesResult.details.items.map(jsLib => {
        return {
          name: jsLib.name,
          version: jsLib.version || '(version not avaliable)'
        }
      })
    }
    return []
  }
}
