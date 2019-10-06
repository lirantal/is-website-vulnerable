/* eslint-disable security/detect-object-injection */
/* eslint-disable indent */
'use strict'

const chalk = require('chalk')

module.exports = class RenderConsole {
  constructor(scanResults, outputType) {
    this.data = scanResults
    this.outputType = outputType
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

    switch (this.outputType) {
      case '--json': {
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

        return JSON.stringify(
          {
            website: this.data.lhr.finalUrl,
            executionTime: this.data.lhr.timing.total + ' ms',
            totalVulnerabilities: vulnerabilitiesCount,
            result
          },
          null,
          2
        )
      }
      default: {
        let output = ''
        output += `
`
        output += `Website: ${this.data.lhr.finalUrl}`

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
          ○ ${this.noWarnings}`
        }

        output += `

[${chalk.bold.white(vulnerabilitiesCount)}] Total vulnerabilities
[${this.data.lhr.timing.total}ms] execution time
        
vulnerabilities powered by Snyk.io (https://snyk.io/vuln?type=npm)
        `

        return output
      }
    }
  }

  formatVulnerability(vulnItem) {
    if (!vulnItem || !vulnItem.detectedLib || !vulnItem.vulnCount || !vulnItem.highestSeverity) {
      return ''
    }

    var output
    switch (this.outputType) {
      case '--json':
        output = {
          library: vulnItem.detectedLib.text,
          severity: vulnItem.highestSeverity,
          vulnerabilitiesCount: vulnItem.vulnCount,
          url: vulnItem.detectedLib.url
        }
        break

      default:
        output = `  
⎡ ${chalk.red('✖')} ${vulnItem.detectedLib.text}
⎜ ${this.formatSeverityChart(vulnItem.highestSeverity)} ${chalk
            .bgHex(this.formatSeverityColor(vulnItem.highestSeverity))
            .bold(` ${vulnItem.vulnCount} `)} vulnerabilities
⎣ ${chalk.hex('#4b45a1')('▶')}︎ ${vulnItem.detectedLib.url}`
    }
    return output
  }

  formatSeverityColor(severity) {
    const colorSeverityMap = {
      Low: '#595775',
      Medium: '#df8620',
      High: '##b31a6b'
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