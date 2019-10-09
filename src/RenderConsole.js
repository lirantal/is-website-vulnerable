/* eslint-disable security/detect-object-injection */
/* eslint-disable indent */
'use strict'

const chalk = require('chalk')

module.exports = class RenderConsole {
  constructor(scanResults) {
    this.data = scanResults
  }

  print() {
    const output = this.format()
    console.log(output)
  }

  format() {
    let output = ''

    output += `
  `
    output += `Website: ${this.data.lhr.finalUrl}`

    const vulnerabilitiesResults = this.data.lhr.audits['no-vulnerable-libraries']
    let vulnerabilitiesCount = 0

    if (
      vulnerabilitiesResults.details &&
      vulnerabilitiesResults.details.items &&
      vulnerabilitiesResults.details.items.length > 0
    ) {
      vulnerabilitiesResults.details.items.forEach(vulnItem => {
        vulnerabilitiesCount += vulnItem.vulnCount
        const vulnInfo = this.formatVulnerability(vulnItem)
        output += vulnInfo
      })
    } else {
      output += `
  ○ No JavaScript libraries detected with publicly known security vulnerabilities`
    }

    output += `
  
  [${chalk.bold.white(vulnerabilitiesCount)}] Total vulnerabilities
  [${this.data.lhr.timing.total}ms] execution time
  vulnerabilities powered by Snyk.io (https://snyk.io/vuln?type=npm)
    `

    return output
  }

  formatVulnerability(vulnItem) {
    if (!vulnItem || !vulnItem.detectedLib || !vulnItem.vulnCount || !vulnItem.highestSeverity) {
      return ''
    }

    return `
  
    ⎡ ${chalk.red('✖')} ${vulnItem.detectedLib.text}
    ⎜ ${this.formatSeverityChart(vulnItem.highestSeverity)} ${chalk
      .bgHex(this.formatSeverityColor(vulnItem.highestSeverity))
      .bold(` ${vulnItem.vulnCount} `)} vulnerabilities
    ⎣ ${chalk.hex('#4b45a1')('▶')}︎ ${vulnItem.detectedLib.url}`
  }

  formatSeverityColor(severity) {
    const colorSeverityMap = {
      Low: '#595775',
      Medium: '#df8620',
      High: '#b31a6b'
    }

    return colorSeverityMap[severity] || colorSeverityMap['Low']
  }

  formatSeverityChart(severity) {
    let severityText = ''

    switch (severity) {
      case 'Low':
        severityText = `${chalk.hex(this.formatSeverityColor(severity)).bold('■')}■■`
        break
      case 'Medium':
        severityText = `■${chalk.hex(this.formatSeverityColor(severity)).bold('■')}■`
        break
      case 'High':
        severityText = `■■${chalk.hex(this.formatSeverityColor(severity)).bold('■')}`
        break
      default:
        severityText = `${chalk.hex(this.formatSeverityColor(severity)).bold('■')}■■`
        break
    }

    return severityText
  }
}
